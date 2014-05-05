// Locate the closest feature
function getClosestFeature(evt) {
    // Setup the report progress bar and show it
    $("#closestFeatureLoadBar").progressbar({
        value: false
    });
    $("#closestFeatureLoadBar").show();

    // Clear previous grpahics
    app.map.graphics.clear();

    // Get the map click point and add it as a location
    var inPoint = new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, app.map.spatialReference);
    var location = new esri.Graphic(inPoint, configOptions.markerSymbol);
    // Add map click to map
    app.map.graphics.add(location);
    // Push map click into incident parameter
    var features = [];
    features.push(location);
    var incidents = new esri.tasks.FeatureSet();
    incidents.features = features;


    // Get the facility features from the map service
    var dataLayer = new esri.tasks.DataFile({
        url: configOptions.facilitiesURL + "/query?where=1%3D1&returnGeometry=true&outFields=*&f=json"
    });

    // Setup the parameters for the closest facility
    var closestFacilityParams = {
        "incidents": incidents,
        "facilities": dataLayer,
        "cutoff": configOptions.cutOffTime,
        "route_shape": "True Shape",
        "populate_directions": true,
        "directions_language": "en",
        "directions_distance_units": "Meters",
        "directions_style_name": "NA Desktop"
    }

    // Setup closest facility task
    // If service is secure get token
    var closestFacilityTask;
    if (configOptions.closestFacilityService.secure === "true" || configOptions.closestFacilityService.secure === true) {
        // Make the request
        getToken(configOptions.closestFacilityService.tokenURL, configOptions.closestFacilityService.username, configOptions.closestFacilityService.password, function (token) {
            closestFacilityTask = new esri.tasks.Geoprocessor(configOptions.closestFacilityService.url + "?token=" + token);
            closestFacilityTask.outSpatialReference = app.map.spatialReference;
            // Submit the closest facility tool task
            closestFacilityTask.submitJob(closestFacilityParams, completeCallback);
        });
    }
    else {
        closestFacilityTask = new esri.tasks.Geoprocessor(configOptions.closestFacilityService.url);
        closestFacilityTask.outSpatialReference = app.map.spatialReference;
        // Submit the closest facility tool task
        closestFacilityTask.submitJob(closestFacilityParams, completeCallback, taskFailed);
    }

    // When task is complete
    function completeCallback(jobInfo) {
        // If job completed successfully
        if (jobInfo.jobStatus !== "esriJobFailed") {
            // When route and directions returned
            closestFacilityTask.getResultData(jobInfo.jobId, "output_routes", getRoute);
            closestFacilityTask.getResultData(jobInfo.jobId, "output_directions", getDirections);
        }
            // If failed
        else {
            // Show the error message - Get from job info messages
            alert(configOptions.errorMessageText + jobInfo.messages[6].description);
        }
        // Hide progress bar
        $("#closestFeatureLoadBar").hide();

        // Go back to identify mode
        clickmode = 'identify';
        changeCursor(clickmode);
    }

    // Get route result
    function getRoute(result) {
        // For each of the features returned
        $.each(result.value.features, function () {
            // Add facility to map
            var layerOID = this.attributes.FacilityID;
            var queryTask = new esri.tasks.QueryTask(configOptions.facilitiesURL);
            var query = new esri.tasks.Query();
            query.where = "OBJECTID = " + layerOID;
            query.outSpatialReference = app.map.spatialReference;
            query.returnGeometry = true;
            query.outFields = ["*"];
            queryTask.execute(query, function (results) {
                // For each of the results returned
                $.each(results.features, function () {
                    var facility = new esri.Graphic(this.geometry, configOptions.markerSymbol);
                    // Add point to map
                    app.map.graphics.add(facility);
                });
            });

            // Add the route to the map
            var route = new esri.geometry.Polyline(this.geometry);
            var graphic = new esri.Graphic(route, configOptions.routeLineSymbol);
            app.map.graphics.add(graphic);

            // Zoom to feature and expand out extent
            var extent = graphic.geometry.getExtent();
            app.map.setExtent(extent.expand(configOptions.routeZoomBuffer));
        });
    }
    // Get directions result
    function getDirections(result) {
        // For each of the features returned
        var directionsText = "";
        var count = 0;
        $.each(result.value.features, function () {
            var directions = this.attributes.Text;
            var distance = Math.round(this.attributes.DriveDistance * 100) / 100;
            var time = Math.round(this.attributes.ElapsedTime * 100) / 100;

            // If not the first line then add paragraph and directions
            if (count != 0) {
                directionsText = directionsText + "</br></br><B>" + directions + "</B>";

                // Add in distance and time if necessary
                if (distance > 0) {
                    directionsText = directionsText + "</br>" + distance + " metres";
                }
                if (time > 0) {
                    directionsText = directionsText + "</br>" + time + " minutes";
                }
            }
                // Add starting text
            else {
                directionsText = directionsText + "<B>Starting from your location</B>";
            }
            count = count + 1;
        });

        // // Populate and show info window - Desktop version
        if (currentPage.indexOf("map") != -1) {
            app.map.infoWindow.hide();
            // Size of infoWindow
            app.map.infoWindow.resize(configOptions.infowWindowSize[0], configOptions.infowWindowSize[1]);
            app.map.infoWindow.setTitle("Directions");

            // Set location of info window
            var screenPoint = new esri.geometry.ScreenPoint((app.map.width / 1.5), (app.map.height / 2));

            // Set info window content           
            app.map.infoWindow.setContent("<div id='directionsContent'></div>");
            $("#directionsContent").append(directionsText);
            app.map.infoWindow.show(screenPoint, app.map.getInfoWindowAnchor(screenPoint));
        }
    }
}