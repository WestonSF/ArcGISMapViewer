 // When result is selected from autocomplete or result returned from text search
 function onSearch(result, selectedLocator, searchType) {
     console.log("Search result selected from locator - " + selectedLocator);
     var point;
     var searchText;

     // If doing text search
     if (searchType == "textSearch") {
         // If results are returned
         if (result.results.length > 0) {
             point = result.results[0].feature.geometry;
             searchText = result.results[0].name;
         }
         else {
             alert("No features found, please try again");
         }
     }
     else {
         point = result.feature.geometry;
         searchText = result.name;
     }
    
    // Go through search parameters, get the parameters for the search
    $.each(configOptions.searchParams, function () {        
        if (this.name == selectedLocator) {
             // If query task provided then do a query search
             if (this.queryTaskURL && this.searchField) {
                 console.log("Searching against map service");
                 queryLocate(searchText, selectedLocator);
             }
             // Else go to locator check
             else {
                 // If doing text search
                 if (searchType == "textSearch") {
                     locatorCheck(searchText, point, result.results[0].feature.attributes.Loc_name);
                 }
                 else {
                     locatorCheck(searchText, point, result.feature.attributes.Loc_name);
                 }
             }
         }
     });
 }


 // Check what type of locator is being used
 function locatorCheck(searchText, point, compositeLocatorName) {     
     // If using a composite locator
     if (compositeLocatorName) {
         console.log("Searching against composite locator");
         var searchDone = false;
         // Go through search parameters, get the parameters for the search type
         $.each(configOptions.searchParams, function () {
             if (this.locatorName == compositeLocatorName) {
                 // If query task provided then do a query search
                 if (this.queryTaskURL && this.searchField) {
                     console.log("Searching against map service");
                     queryLocate(searchText, this.name);
                     searchDone = true;
                 }
                 // Go to geocode search
                 else {
                     console.log("Searching against single locator");
                     geocodeLocate(point);
                     searchDone = true;
                 }
             }
         });
         // If search still hasn't been done do geocode search
         if (searchDone == false) {
             console.log("Searching against single locator");
             geocodeLocate(point);
             SearchDone = true;
         }
     }
     // Go to geocode search
     else {
         console.log("Searching against single locator");
         geocodeLocate(point);
     }
 }


 // Search using a geocoder service
 function geocodeLocate(point) {
     // Hide previous info window and graphic
     app.map.graphics.clear();
     app.map.infoWindow.hide();
     var symbol = new esri.symbol.PictureMarkerSymbol('images/pin.png', 25, 25);

     var graphic = new esri.Graphic(point, symbol);
     app.map.graphics.add(graphic);

     // Factor for converting point to extent 
     var factor = 20;

     var extent = new esri.geometry.Extent(point.x - factor, point.y - factor, point.x + factor, point.y + factor, app.map.spatialReference);
     // Zoom to feature and expand out extent
     app.map.setExtent(extent.expand(configOptions.searchZoomBuffer));
 }



 // Search using query of the map service
 function queryLocate(searchText, selectedLocator) {
     // Set the search text to find parameters
     $.each(configOptions.searchParams, function () {         
            if (this.name == selectedLocator) {
                console.log("Executing map service query");
                var queryTask = new esri.tasks.QueryTask(this.queryTaskURL);
                var query = new esri.tasks.Query();
                query.where = this.searchField + " like '" + searchText + "%'";
                query.outSpatialReference = { wkid: configOptions.spatialReference.WKID };
                query.returnGeometry = this.returnGeometry;
                query.outFields = ["*"];
                queryTask.execute(query, function (results) {
                    console.log("Map service query result returned");
                    getQueryResults(results, selectedLocator);
                });    
            }
        });     
 }

 // When results are returned from query
 function getQueryResults(results, selectedLocator) {
     try {
        // Hide previous info window and graphic
        app.map.graphics.clear();
        app.map.infoWindow.hide();

        // If results are returned from map service query
        if (results.features.length > 0) {
            // Create array of attributes
            var graphic;
            var extent;
            var items = dojo.map(results.features, function (result) {
                graphic = result;
                var pt = graphic.geometry;
                switch (pt.type) {
                    case "point":
                        graphic.setSymbol(configOptions.markerSymbol);
                        break;
                    case "polyline":
                        graphic.setSymbol(configOptions.lineSymbol);
                        break;
                    case "polygon":
                        graphic.setSymbol(configOptions.polygonSymbol);
                        break;
                }

                // Factor for converting point to extent 
                var factor = 20;

                // For point, which doesn't have an extent
                if (pt.type == "point") {
                    extent = new esri.geometry.Extent(pt.x - factor, pt.y - factor, pt.x + factor, pt.y + factor, app.map.spatialReference);
                }
                    // Else for line and polygon
                else {
                    extent = graphic.geometry.getExtent();
                }

                // Add graphic to map
                app.map.graphics.add(graphic);

                return result.attributes;
            });

            // Zoom to feature and expand out extent
            app.map.setExtent(extent.expand(configOptions.searchZoomBuffer));

            // On extent change end
            var searchPoint;
            var screenPoint;
            afterSearchIdentify = dojo.connect(app.map, "onExtentChange", function () {
                // Get the geometry type
                switch (graphic.geometry.type) {
                    case "point":
                        // For point - Just get the point and convert to screen point
                        searchPoint = graphic.geometry;
                        screenPoint = app.map.toScreen(searchPoint);

                        // Autopopup if set in config
                        // Show infoWindow for searches set in config
                        count = 0
                        // For each of the values in searchautopopup
                        while (configOptions.searchautopopup.length > count) {
                            if (selectedLocator == configOptions.searchautopopup[count]) {
                                var pagePath = window.location.pathname;
                                var currentPage = pagePath.substring(pagePath.lastIndexOf('/') + 1);
                                doIdentifySearch(searchPoint, screenPoint);
                            }
                            else {
                                // Disconnect extent change end event handler
                                dojo.disconnect(afterSearchIdentify);
                            }
                            count = count + 1;
                        }

                        break;
                    case "polyline":
                        break;
                    case "polygon":
                        // For polygons - Call the geometry service to label points which will return a point inside the polygon - Geometry service is working correctly
                        geometryService = new esri.tasks.GeometryService(configOptions.geometryserviceurl);
                        geometryService.labelPoints([graphic.geometry], function (labelPoints) {
                            // Get center points of the graphic returned to send to identify function
                            searchPoint = new esri.geometry.Point(labelPoints[0].x, labelPoints[0].y, app.map.spatialReference);
                            screenPoint = app.map.toScreen(searchPoint);

                            // Autopopup if set in config
                            // Show infoWindow for searches set in config
                            count = 0
                            // For each of the values in searchautopopup
                            while (configOptions.searchautopopup.length > count) {
                                if (selectedLocator == configOptions.searchautopopup[count]) {
                                    var pagePath = window.location.pathname;
                                    var currentPage = pagePath.substring(pagePath.lastIndexOf('/') + 1);
                                    if (currentPage.indexOf("mobile") != -1) {
                                        // Do nothing - Don't go to function that does auto popup as it is different for mobile
                                    }
                                    else {
                                        doIdentifySearch(searchPoint, screenPoint);
                                    }
                                }
                                else {
                                    // Disconnect extent change end event handler
                                    dojo.disconnect(afterSearchIdentify);
                                }
                                count = count + 1;
                            }

                        });
                        break;
                }
                dojo.disconnect(afterSearchIdentify);
            });
        }

        // If No results returned
        else {
            alert("No features found, please try again");
        }
    }

    catch (err) {
        console.log(err);
        return false;
    }      

 }
      
