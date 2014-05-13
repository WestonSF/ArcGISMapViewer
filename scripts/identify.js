// When map is clicked
function mapClick(evt) {
    // Get identify mode
    switch (clickmode) {
        case 'streetview':
            showStreetView(evt);
            break;
        case 'identify':
            doIdentify(evt,null);
            break;
        case 'propertyreport':
            doIdentify(evt,"propertyreport");
            break;
        case 'reports':
            doIdentify(evt, "reports");
            break;
        case 'closestfeature':
            getClosestFeature(evt);
            break;
        default:
            // Do nothing
            break;
    }
}

// Automatic identify function after search
function doIdentifySearch(searchPoint, screenPoint) {
    // Clear graphics and info window
    app.map.graphics.clear();
    app.map.infoWindow.hide();

    // Size of infoWindow
    app.map.infoWindow.resize(configOptions.infowWindowSize[0], configOptions.infowWindowSize[1]);
    //app.map.infoWindow.setContent(tc.domNode);
    app.map.infoWindow.setTitle("Information");

    // Setup the tabs in the info window - Different versions
    if (currentPage.indexOf("mobile") != -1) {
        $("#identificationresults").html("<div id='identifyTabs'><ul></ul></div>");
    }
    else {
        app.map.infoWindow.setContent("<div id='identifyTabs'><ul></ul></div>");
    }

    $("#identifyTabs").tabs();

    // setup identify parameters variable
    identifyParams = new esri.tasks.IdentifyParameters();

    // For each of the identify parameters from config
    $.each(configOptions.identifyParams, function () {
        // Get the identify URL
        identifyTask = new esri.tasks.IdentifyTask(this.identifyTask);

        // Check if layer is currently visible on map or identify not visible is on in config
        var layer = app.map.getLayer(this.id);
        if (configOptions.identifynotvisible === "true" || configOptions.identifynotvisible === true || (layer && layer.visible)) {
            // Change cursor to loading - Desktop or embed version
            if ((currentPage.indexOf("desktop") != -1) || (currentPage.indexOf("embed") != -1)) {
                changeCursor('loading');
            }

            identifyParams.tolerance = this.tolerance;
            identifyParams.returnGeometry = this.returnGeometry;
            identifyParams.layerIds = this.layerIds;
            identifyParams.layerOption = this.layerOption;
            identifyParams.width = app.map.width;
            identifyParams.height = app.map.height;
            identifyParams.geometry = searchPoint;
            identifyParams.mapExtent = app.map.extent;
            var showChart = this.showChart;
            var chartFields = this.chartFields;
            var identifyLayerAliases = this.identifyLayerAliases;

            identifyTask.execute(identifyParams, function (idResults) { addToMap(idResults, identifyLayerAliases, screenPoint, null, showChart, chartFields, "identifySearch") });
        }
    });

    // Disconnect extent change end event handler
    dojo.disconnect(afterSearchIdentify);
}

// Identify function from map click handler
function doIdentify(evt, report) {
    // Enable if scale is below certain level
    var currentScale = app.map.getScale();
    if (currentScale > configOptions.maxidentifyscale) {
        // Do nothing
    }
    else {
        // Clear graphics and info window
        app.map.graphics.clear();
        app.map.infoWindow.hide();

        // Size of infoWindow
        app.map.infoWindow.resize(configOptions.infowWindowSize[0], configOptions.infowWindowSize[1]);
        app.map.infoWindow.setTitle("Information");

        // Setup the tabs in the info window - Different versions
        if (currentPage.indexOf("mobile") != -1) {
            $("#identificationresults").html("<div id='identifyTabs'><ul></ul></div>");
        }
        else {
            app.map.infoWindow.setContent("<div id='identifyTabs'><ul></ul></div>");
        }

        $("#identifyTabs").tabs();

        // Setup identify parameters variable
        identifyParams = new esri.tasks.IdentifyParameters();
            
        // If coming from property report tool then just query property layer
        if (report) {
            identifyTask = new esri.tasks.IdentifyTask(configOptions.reportMapServiceIdentify.identifyTask);

            // Change cursor to loading - Desktop or embed version
            if ((currentPage.indexOf("desktop") != -1) || (currentPage.indexOf("embed") != -1)) {
                changeCursor('loading');
            }

            identifyParams.tolerance = configOptions.reportMapServiceIdentify.tolerance;
            identifyParams.returnGeometry = configOptions.reportMapServiceIdentify.returnGeometry;
            identifyParams.layerIds = configOptions.reportMapServiceIdentify.layerIds;
            identifyParams.layerOption = configOptions.reportMapServiceIdentify.layerOption;
            identifyParams.width = app.map.width;
            identifyParams.height = app.map.height;
            identifyParams.geometry = evt.mapPoint;
            identifyParams.mapExtent = app.map.extent;
            var identifyLayerAliases = configOptions.reportMapServiceIdentify.identifyLayerAliases;

            identifyTask.execute(identifyParams, function (idResults) { addToMap(idResults, identifyLayerAliases, evt.screenPoint, report, null, null, null) });
        }
        else {
            // For each of the identify parameters from config
            $.each(configOptions.identifyParams, function () {
                layerID = this.id

                // If using ArcGIS Online web map
                if (configOptions.useAGSOnlineWebMap == "true" || configOptions.useAGSOnlineWebMap == true) {
                    // For each layer
                    $.each(operationalLayers, function () {
                        operationalLayerID = this.id;
                        // Get the ID by splitting as ArcGIS Online IDs add on _number.
                        splitOperationalLayerId = operationalLayerID.split("_");

                        // Get the ID as ArcGIS Online set different IDs
                        if (layerID == splitOperationalLayerId[0]) {
                            layerID = operationalLayerID;
                        }
                    });
                }

                // Get the identify URL
                identifyTask = new esri.tasks.IdentifyTask(this.identifyTask);
                // Check if layer is currently visible on map or identify not visible is on in config
                var layer = app.map.getLayer(layerID);

                if (layer) {
                    if (configOptions.identifynotvisible === "true" || configOptions.identifynotvisible === true || (layer.visible)) {
                        // Change cursor to loading - Desktop or embed version
                        if ((currentPage.indexOf("desktop") != -1) || (currentPage.indexOf("embed") != -1)) {
                            changeCursor('loading');
                        }

                        identifyParams.tolerance = this.tolerance;
                        identifyParams.returnGeometry = this.returnGeometry;
                        identifyParams.layerIds = this.layerIds;
                        identifyParams.layerOption = this.layerOption;
                        identifyParams.width = app.map.width;
                        identifyParams.height = app.map.height;
                        identifyParams.geometry = evt.mapPoint;
                        identifyParams.mapExtent = app.map.extent;
                        var showChart = this.showChart;
                        var chartFields = this.chartFields;
                        var identifyLayerAliases = this.identifyLayerAliases;

                        identifyTask.execute(identifyParams, function (idResults) { addToMap(idResults, identifyLayerAliases, evt.screenPoint, null, showChart, chartFields, null) });
                    }
                }
            });
        }
    }
}


// Setup the tabs, info window and set content
function addToMap(idResults, layerAliases, screenPoint, report, showChart, chartFields, identifySearch) {
    // Array of all results in this response, which may or may not contain results for more than one layer
    var allLayerResults = new Array;
    // Tab number to select                    
    var tabNumber;

    // If no results returned from property report
    if (idResults.length == 0 && report) {
        alert("No property at this location");
    }
    // If some results are returned show infoWindow
    if (idResults.length > 0) {
        // Show popup if in desktop and not identify search in mobile or embed versions
        if ((!identifySearch) || (currentPage.indexOf("desktop") != -1)) {
            // Show popup - Different versions
            if (currentPage.indexOf("mobile") != -1) {
                // Show the mobile window
                $("#identifyPopup").popup("open");
            }
            else {
                // Show info window
                app.map.infoWindow.show(screenPoint, app.map.getInfoWindowAnchor(screenPoint));
                // Maximise info window - Embed version
                if (currentPage.indexOf("embed") != -1) {
                    app.map.infoWindow.maximize();
                }
            }
        }

        // For each of the results returned
        for (var i = 0; i < idResults.length; i++) {
            var idResult = idResults[i];
            console.log('Identify results returned for ' + idResult.layerName);

            // Add graphic to map of feature selected
            var graphic = idResult.feature;
            // If geometry returned, add symbology
            if (graphic.geometry !== null) {
                // Depending on the geometry type, set the symbology
                switch (graphic.geometry.type) {
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
                // add graphic to map
                app.map.graphics.add(graphic);
            }

            // Several results for the one layer
            var layerResults = null;
            $.each(allLayerResults, function () {
                if (this.layerName === idResult.layerName) {
                    // Fetch layerResults from results
                    layerResults = this;
                }
            });

            // If first of results
            if (layerResults == null) {
                // Create new layerResults and add to results
                layerResults = { layerName: idResult.layerName, features: [] };
                allLayerResults.push(layerResults);
            }

            // For all the layer aliases from the config
            for (var count = 0; count < layerAliases.length; ++count) {
                // If layer name in config equals layer name returned from results
                if (layerAliases[count].layerName === idResult.layerName) {
                    
                    // Get the name for the tab from the config and create ID for it
                    var tabname = replaceAll(layerAliases[count].tabName, " ", "_") + 'Tab';

                    layerResults = { layerName: idResult.layerName, features: [] };
                    layerResults.features.push(idResult.feature);

                    // If result for the layer
                    if (i == 0) {
                        // Create new tab for layer
                        $("#identifyTabs ul").append("<li><a href='#" + tabname + "'>" + layerAliases[count].tabName + "</a></li>");
                        $("#identifyTabs").append("<div id='" + tabname + "'></div>");
                        // Refresh tabs
                        $("#identifyTabs").tabs("refresh");
                        // Activate first tab
                        $("#identifyTabs").tabs({ active: 0 });

                        // Set the tab order, if tab index is 1 in config then make sure this is the first tab
                        if (layerAliases[count].tabindex == 1) {
                            // Get the current tab position                       
                            tabNumber = $("#identifyTabs").children("div").length - 1;

                            // Activate the tab
                            $("#identifyTabs").tabs({ active: tabNumber });
                        }
                    }
                    // If on the second result for a layer or more
                    else {
                        var createdTab = false;
                        var tabs = new Array;

                        // Get an array of tabs created
                        $('#identifyTabs div').each(function () {
                            // Push into array
                            tabs.push(this.id);
                        })
                        // For each of the tabs
                        $.each(tabs, function () {
                            if (this == tabname) {
                                createdTab = true;
                            }
                        });
                        // If tab has not been created yet
                        if (createdTab == false) {
                            // Create new tab for layer
                            $("#identifyTabs ul").append("<li><a href='#" + tabname + "'>" + layerAliases[count].tabName + "</a></li>");
                            $("#identifyTabs").append("<div id='" + tabname + "'></div>");
                            // Refresh tabs
                            $("#identifyTabs").tabs("refresh");
                            // Activate first tab
                            $("#identifyTabs").tabs({ active: 0 });
                        }
                    }

                    // Load in results to the tab by calling the layerTabContent function
                    $('#' + tabname).append(layerTabContent(layerResults, layerAliases[count].layerName, layerAliases[count].displayFormat, report));

                }
            }
        }
    }

    // Activate the default tab
    if (tabNumber) {
        $("#identifyTabs").tabs({ active: tabNumber });
    }

    // Change back to identify - Desktop or embed version
    if ((currentPage.indexOf("desktop") != -1) || (currentPage.indexOf("embed") != -1)) {
        changeCursor('identify');
    }
    // Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        clickmode = 'identify';
    }
}

// Get content to go into results tab for info window
function layerTabContent(layerResults, layerName, displayFormat, report) {
    var content = "";
    content += "<table border='0'>";

    // For all the features returned
    for (var i = 0, il = layerResults.features.length; i < il; i++) {

        var featureLine = displayFormat;
        featureLine = featureLine.replace('[#featureIndex#]', i);
        featureLine = featureLine.replace('[#layerName#]', "&quot;" + layerName + "&quot;");

        // For each of the features returned, add in to table
        $.each(getPlaceholders(featureLine), function () {
            // If attribute available
            if (layerResults.features[i].attributes[this] != null) {
                // Add new record to table
                featureLine = featureLine.replace('[#' + this + '#]', layerResults.features[i].attributes[this]);

                // If reports tool identify
                if (report == "reports") {
                    // Update the reports dialog parameters with address selected
                    if (this == configOptions.propertyIDField) {
                        $('#propertyID').val(layerResults.features[i].attributes[this]);
                        // Enable reports button
                        $('#reportsButton').attr('disabled', 'disabled').button('enable');
                    }
                    if (this == configOptions.propertyAddressField) {
                        $("#addressSelected").text(layerResults.features[i].attributes[this]);
                    }
                }
            }
            else {
                // Log the error
                console.error('Unable to find attribute \"' + this + '\" for layerName \"' + layerName + '\".');
                console.log('Available attributes:');
                console.log(layerResults.features[i].attributes);
            }
        });
        content += "<tr><td><hr/>" + featureLine + "</td></tr>";
    }
    content += "</tr><tr><td></td></tr></table>";
    return content;
}

// When a new button is clicked, changing the mode of the map click
function changeCursor(cursorMode) {
    // Get CSS for icon, change button mode to that and update hover over
    $("#btnMode").css('background-image', $("#btn" + cursorMode.charAt(0).toUpperCase() + cursorMode.substring(1)).css('background-image'));

    // Change icon - Desktop version
    if (currentPage.indexOf("desktop") != -1) {
        if (cursorMode != "loading" && cursorMode != "inactive") {
            // If button title available use that for tooltip otherwise just use the cursor mode
            if (document.getElementById('btn' + cursorMode.charAt(0).toUpperCase() + cursorMode.substring(1)).title) {
                document.getElementById('btnMode').title = document.getElementById('btn' + cursorMode.charAt(0).toUpperCase() + cursorMode.substring(1)).title;
            }
            else {
                document.getElementById('btnMode').title = cursorMode.charAt(0).toUpperCase() + cursorMode.substring(1);
            }
        }
    }
    
    clickmode = cursorMode; // used in mapClick(evt)
    $("#map_layers").css('cursor', 'default');
    $("#titlePaneTools").css('cursor', 'default');

    if (cursorMode != 'measuring') {
        // If measurement tool available, close it
        if (measureTool) {
            measureTool.closeTool();
            measureTool.clearResult();
        }
    }

    switch (clickmode) {
        case 'loading':
            clickmode = "inactive";
            dojo.byId("map_layers").style.cursor = "wait";
            break;
        case 'zoomin':
            clickmode = "inactive";
            navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
            dojo.byId("map_layers").style.cursor = "url('images/Magnify_In.png'),default";
            break;
        case 'zoomout':
            clickmode = "inactive";
            navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
            dojo.byId("map_layers").style.cursor = "url('images/Magnify_Out.png'),default";
            break;
        case 'pan':
            clickmode = "inactive";
            navToolbar.activate(esri.toolbars.Navigation.PAN);
            dojo.byId("map_layers").style.cursor = "url('images/Hand.png'),default";
            break;
        case 'streetview':
            navToolbar.deactivate();
            // Show tooltip
            $('lblGoogleStreetView').toggle();
            break;
        case 'propertyreport':
            navToolbar.deactivate();       
            break;
        case 'reports':
            navToolbar.deactivate();
            break;
        case 'closestfeature':
            navToolbar.deactivate();
            break;
        case 'identify':
            navToolbar.deactivate();
            break;
        case 'inactive':
            navToolbar.deactivate();
            break;
        case 'draw':
            navToolbar.deactivate();
            break;
        case 'measuring':
            navToolbar.deactivate();
            break;
        default: 
            // do nothing; 
            break;
    }
}
  
// From http://stackoverflow.com/questions/11222406/how-to-get-placeholder-from-string-in-javascript
function getPlaceholders(str) {
    var regex = /\[#([^#]+)#\]+/g;
    var result = [];

    while (match = regex.exec(str)) {
        result.push(match[1]);
    }

    return result;
}

// --------------------------------------------------------------------------- Street View functionality ---------------------------------------------------------------------------
function showStreetView(evt) {
    var point = evt.mapPoint;

    // Probably don't need this, the else part should work fine for WKID 102100 - this may be slightly quicker though.  It is needed for 3857 though in case 3857 is used incorrectly instead of 102100 (as 102100 = 3857)
    if (parseInt(configOptions.spatialReference.WKID) == 102100 || parseInt(configOptions.spatialReference.WKID) == 3857) {
        var pt = esri.geometry.webMercatorToGeographic(evt.mapPoint);
        var GoogleStreetViewURL = './StreetView.html?x=' + pt.y + '&y=' + pt.x;
        $("#StreetView").dialog("open");
        $("#StreetViewIframe").attr("src", GoogleStreetViewURL);
    }
    else 
    {
            var outSR = new esri.SpatialReference({ wkid: 4326 }); // project point from current projection to LatLong for Google StreetView.

            esri.config.defaults.geometryService.project([point], outSR, function (projectedPoints) {
                var pt = projectedPoints[0];
                var GoogleStreetViewURL = './StreetView.html?x=' + pt.y + '&y=' + pt.x;
                $("#StreetView").dialog("open");
                $("#StreetViewIframe").attr("src", GoogleStreetViewURL);
            });
    }

    // Go back to identify mode
    clickmode = 'identify';
    changeCursor(clickmode);

    $("#map_layers").css('cursor', 'default');
    $("#titlePaneTools").css('cursor', 'default');

    return false;
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
