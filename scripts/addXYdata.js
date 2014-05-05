// When CSV button is clicked
function uploadCSVfile() {
    // Set the upload form handler
    $('#inCSV').on("change", function () {
        // If file API is supported - IE10+
        if (this.files) {
            // Get the file
            uploadFile(this.files[0]);
        }
        else {
            // Get the file
            uploadFile(this.value);
        }     
    });

    // Upload CSV dialog
    $("#uploadCSVfile").dialog();

    // Setup colour picker
    $('#csv-colour-picker select').colourPicker({
        ico: 'images/Colour_Picker.png',
        title: false
    });
}

// Drag and drag CSV onto map setup
function setupDropZone() {
    // Let's verify that we have proper browser support, before
    // moving ahead. You can also use a library like Modernizr
    // to detect browser cappabilities:
    // http://www.modernizr.com/
    if (!window.File || !window.FileReader) {
        // do nothing for non compatible browsers and exit
        return;
    }

    var node = dojo.byId("map");
    // Reference
    // http://www.html5rocks.com/features/file
    // http://www.html5rocks.com/tutorials/dnd/basics/
    // https://developer.mozilla.org/En/DragDrop/Drag_Operations
    dojo.connect(node, "dragenter", function (evt) {
        // If we don't prevent default behavior here, browsers will
        // perform the default action for the file being dropped i.e,
        // point the page to the file.
        evt.preventDefault();
    });

    dojo.connect(node, "dragover", function (evt) {
        evt.preventDefault();
    });
    dojo.connect(node, "drop", handleDrop);
}

// When CSV is dragged onto map
function handleDrop(evt) {
    console.log("Drop: ", evt);
    evt.preventDefault();
    // Reference
    // http://www.html5rocks.com/tutorials/file/dndfiles/
    // https://developer.mozilla.org/en/Using_files_from_web_applications
    var dataTransfer = evt.dataTransfer,
            files = dataTransfer.files,
            types = dataTransfer.types;

    // File drop
    if (files && files.length === 1) {
        console.log("[ FILES ]");
        // Read the one file
        var file = files[0]; 
        console.log("type = ", file.type);
        if (file.type.indexOf("image/") !== -1) {
            handleImage(file, evt.layerX, evt.layerY);
        } else if (file.name.indexOf(".csv") !== -1) {
            handleCsv(file);
        }
    }

    // Textual drop
    else if (types) {
        console.log("[ TYPES ]");
        console.log("  Length = ", types.length);
        dojo.forEach(types, function (type) {
            if (type) {
                console.log("  Type: ", type, ", Data: ", dataTransfer.getData(type));
            }
        });

        // We're looking for URLs only.
        var url;
        dojo.some(types, function (type) {
            if (type.indexOf("text/uri-list") !== -1) {
                url = dataTransfer.getData("text/uri-list");
                return true;
            } else if (type.indexOf("text/x-moz-url") !== -1) {
                url = dataTransfer.getData("text/plain");
                return true;
            } else if (type.indexOf("text/plain") !== -1) {
                url = dataTransfer.getData("text/plain");
                url = url.replace(/^\s+|\s+$/g, "");
                if (url.indexOf("http") === 0) {
                    return true;
                }
            }
            return false;
        });

        if (url) {
            url = url.replace(/^\s+|\s+$/g, "");
            // Check if this URL is a google search result.
            // If so, parse it and extract the actual URL
            // to the search result
            if (url.indexOf("www.google.com/url") !== -1) {
                var obj = esri.urlToObject(url);
                if (obj && obj.query && obj.query.url) {
                    url = obj.query.url;
                }
            }

            if (url.match(/MapServer\/?$/i)) {
                // ArcGIS Server Map Service?
                handleMapServer(url);
            } else if (url.match(/(Map|Feature)Server\/\d+\/?$/i)) {
                // ArcGIS Server Map/Feature Service Layer?
                handleFeatureLayer(url);
            } else if (url.match(/ImageServer\/?$/i)) {
                // ArcGIS Server Image Service?
                handleImageService(url);
            }
        }
    }
}     
        
function handleImage(file, x, y) {
    console.log("Processing IMAGE: ", file, ", ", file.name, ", ", file.type, ", ", file.size);
    var reader = new FileReader();
    reader.onload = function () {
        console.log("Finished reading the image");
        // Create an image element just to find out the image
        // dimension before adding it as a graphic
        var img = dojo.create("img");
        img.onload = function () {
            var width = img.width,
        height = img.height;
            console.log("Image dimensions: ", width, ", ", height);

            // Add a graphic with this image as its symbol
            var symbol = new esri.symbol.PictureMarkerSymbol(reader.result, width > 64 ? 64 : width, height > 64 ? 64 : height);
            var point = app.map.toMap(new esri.geometry.Point(x, y));
            var graphic = new esri.Graphic(point, symbol);
            app.map.graphics.add(graphic);
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
}

function handleMapServer(url) {
    console.log("Processing MS: ", url);
    var layer = new esri.layers.ArcGISDynamicMapServiceLayer(url, {
        opacity: 0.75
    });
    app.map.addLayer(layer);
}

function handleFeatureLayer(url) {
    console.log("Processing FL: ", url);
    var layer = new esri.layers.FeatureLayer(url, {
        opacity: 0.75,
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        infoTemplate: new esri.InfoTemplate(null, "${*}")
    });
    app.map.addLayer(layer);
}

function handleImageService(url) {
    console.log("Processing IS: ", url);
    var layer = new esri.layers.ArcGISImageServiceLayer(url, {
        opacity: 0.75
    });
    app.map.addLayer(layer);
}

// Upload the CSV file
function handleCsv(file) {
    var bytesToString = function (b) {
        console.log("bytes to string");
        var s = [];
        dojo.forEach(b, function (c) {
            s.push(String.fromCharCode(c));
        });
        return s.join("");
    };

    console.log("Processing CSV: ", file, ", ", file.name, ", ", file.type, ", ", file.size);
    if (file.data) {
        // Load module
        require([
            "dojox/encoding/base64"
        ], function () {
            var decoded = bytesToString(dojox.encoding.base64.decode(file.data));
            processCsvData(decoded);
        });
    } else {
        var reader = new FileReader();
        reader.onload = function () {
            console.log("Finished reading CSV data");
            processCsvData(reader.result);
        };
        reader.readAsText(file);
    }
}

// Process the CSV file
function processCsvData(data) {
    var newLineIdx = data.indexOf("\n");
    var firstLine = dojo.trim(data.substr(0, newLineIdx));
    var separator = getSeparator(firstLine);

    // Load module
    require([
        "dojox/data/CsvStore"
    ], function () {
        var csvStore = new dojox.data.CsvStore({
            data: data,
            separator: separator
        });

        csvStore.fetch({
            onComplete: function (items, request) {
                var objectId = 0;
                var featureCollection = generateFeatureCollectionTemplateCsv(csvStore, items);
                var popupInfo = generateDefaultPopupInfo(featureCollection);
                var latField, longField;

                // Get the field names
                var fieldNames = csvStore.getAttributes(items[0]);

                // For each of the field names
                dojo.forEach(fieldNames, function (fieldName) {
                    var matchId;
                    matchId = dojo.indexOf(latFieldStrings, fieldName);
                    if (matchId !== -1) {
                        latField = fieldName;
                    }

                    matchId = dojo.indexOf(longFieldStrings, fieldName);
                    if (matchId !== -1) {
                        longField = fieldName;
                    }
                });

                // Add records in this CSV store as graphics
                dojo.forEach(items, function (item, index) {
                    var attrs = csvStore.getAttributes(item),
                    attributes = {};
                    // Read all the attributes for  this record/item
                    dojo.forEach(attrs, function (attr) {
                        var value = Number(csvStore.getValue(item, attr));
                        if (isNaN(value)) {
                            attributes[attr] = csvStore.getValue(item, attr);
                        } else {
                            attributes[attr] = value;
                        }
                    });

                    attributes["__OBJECTID"] = objectId;
                    objectId++;

                    var latitude = parseFloat(attributes[latField]);
                    var longitude = parseFloat(attributes[longField]);

                    if (isNaN(latitude) || isNaN(longitude)) {
                        return;
                    }

                    var geometry = new esri.geometry.Point(longitude, latitude);

                    var feature = {
                        "geometry": geometry.toJson(),
                        "attributes": attributes
                    };
                    featureCollection.featureSet.features.push(feature);
                });

                var layer = new esri.layers.FeatureLayer(featureCollection, {
                    infoTemplate: new esri.InfoTemplate(buildInfoTemplate(popupInfo)),
                    showAttribution: false,
                    outFields: ["*"]
                });
                layer.__popupInfo = popupInfo

                // Set the layer symbology
                var symbolColour = hexToRgb('#' + $('#csvColours').val());
                var symbolColourArr = symbolColour.split(",");
                var symbolFill = symbolColour + "," + $('#csvOpacity').val();
                var symbolFillArr = symbolFill.split(",");
                var csvSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new dojo.Color(symbolColourArr), 1),
                new dojo.Color(symbolFillArr));
                layer.setRenderer(new esri.renderer.SimpleRenderer(csvSymbol));

                // Add the layer to the map and zoom to it
                csvLayers.push(layer);
                app.map.addLayers(csvLayers);
                zoomToData(layer);

                // Enabled the remove xy button
                $("#removeCSV").button("enable");

                // Hide progress bar
                $("#csvLoadBar").hide();
            },
            onError: function (error) {
                // Show the error message
                alert(configOptions.errorMessageText + "Error fetching items from CSV store: ", error);
                // Hide progress bar
                $("#csvLoadBar").hide();
            }
        });
    });
}

// Create the feature collection
function generateFeatureCollectionTemplateCsv(store, items) {
    // Create a feature collection for the input csv file
    var featureCollection = {
        "layerDefinition": null,
        "featureSet": {
            "features": [],
            "geometryType": "esriGeometryPoint"
        }
    };
    featureCollection.layerDefinition = {
        "geometryType": "esriGeometryPoint",
        "objectIdField": "__OBJECTID",
        "type": "Feature Layer",
        "typeIdField": "",
        "drawingInfo": {},
        "fields": [{
            "name": "__OBJECTID",
            "alias": "__OBJECTID",
            "type": "esriFieldTypeOID",
            "editable": false,
            "domain": null
        }],
        "types": [],
        "capabilities": "Query"
    };

    var fields = store.getAttributes(items[0]);
    dojo.forEach(fields, function (field) {
        var value = store.getValue(items[0], field);
        var parsedValue = Number(value);
        // Check first value and see if it is a number
        if (isNaN(parsedValue)) { 
            featureCollection.layerDefinition.fields.push({
                "name": field,
                "alias": field,
                "type": "esriFieldTypeString",
                "editable": true,
                "domain": null
            });
        } else {
            featureCollection.layerDefinition.fields.push({
                "name": field,
                "alias": field,
                "type": "esriFieldTypeDouble",
                "editable": true,
                "domain": null
            });
        }
    });
    return featureCollection;
}

function generateDefaultPopupInfo(featureCollection) {
    var fields = featureCollection.layerDefinition.fields;
    var decimal = {
        'esriFieldTypeDouble': 1,
        'esriFieldTypeSingle': 1
    };
    var integer = {
        'esriFieldTypeInteger': 1,
        'esriFieldTypeSmallInteger': 1
    };
    var dt = {
        'esriFieldTypeDate': 1
    };
    var displayField = null;
    var fieldInfos = dojo.map(fields, dojo.hitch(this, function (item, index) {
        if (item.name.toUpperCase() === "NAME") {
            displayField = item.name;
        }
        var visible = (item.type !== "esriFieldTypeOID" && item.type !== "esriFieldTypeGlobalID" && item.type !== "esriFieldTypeGeometry");
        var format = null;
        if (visible) {
            var f = item.name.toLowerCase();
            var hideFieldsStr = ",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";
            if (hideFieldsStr.indexOf("," + f + ",") > -1 || f.indexOf("area") > -1 || f.indexOf("length") > -1 || f.indexOf("shape") > -1 || f.indexOf("perimeter") > -1 || f.indexOf("objectid") > -1 || f.indexOf("_") == f.length - 1 || f.indexOf("_i") == f.length - 2) {
                visible = false;
            }
            if (item.type in integer) {
                format = {
                    places: 0,
                    digitSeparator: true
                };
            } else if (item.type in decimal) {
                format = {
                    places: 2,
                    digitSeparator: true
                };
            } else if (item.type in dt) {
                format = {
                    dateFormat: 'shortDateShortTime'
                };
            }
        }

        return dojo.mixin({}, {
            fieldName: item.name,
            label: item.alias,
            isEditable: false,
            tooltip: "",
            visible: visible,
            format: format,
            stringFieldOption: 'textbox'
        });
    }));

    var popupInfo = {
        title: displayField ? '{' + displayField + '}' : '',
        fieldInfos: fieldInfos,
        description: null,
        showAttachments: false,
        mediaInfos: []
    };
    return popupInfo;
}

// Build the info template
function buildInfoTemplate(popupInfo) {
    var json = {
        content: "<table>"
    };

    dojo.forEach(popupInfo.fieldInfos, function (field) {
        if (field.visible) {
            json.content += "<tr><td valign='top'>" + field.label + ": <\/td><td valign='top'>${" + field.fieldName + "}<\/td><\/tr>";
        }
    });
    json.content += "<\/table>";
    return json;
}

// Seperate CSV by delimiter
function getSeparator(string) {
    var separators = [",", "      ", ";", "|"];
    var maxSeparatorLength = 0;
    var maxSeparatorValue = "";
    dojo.forEach(separators, function (separator) {
        var length = string.split(separator).length;
        if (length > maxSeparatorLength) {
            maxSeparatorLength = length;
            maxSeparatorValue = separator;
        }
    });
    return maxSeparatorValue;
}

// Zoom to the feature layer
function zoomToData(featureLayer) {
    // Zoom to the collective extent of the data
    var multipoint = new esri.geometry.Multipoint(app.map.spatialReference);
    dojo.forEach(featureLayer.graphics, function (graphic) {
        var geometry = graphic.geometry;
        if (geometry) {
            multipoint.addPoint({
                x: geometry.x,
                y: geometry.y
            });
        }
    });

    if (multipoint.points.length > 0) {
        app.map.setExtent(multipoint.getExtent().expand(1.25), true);
    }
}

// Upload the CSV file
function uploadFile(file) {    
    // Setup the progress bar and show it
    $('#CSVuploadStatus').html("<div id='csvLoadBar'>");
    $("#csvLoadBar").progressbar({
        value: false
    });
    $("#csvLoadBar").show();

    // If file is object then supports File API, so go straight to handle file
    if (typeof file === 'object') {
        handleCsv(file);
    }
    // Upload files for IE8/IE9
    else {
        // Get the proxy page
        var proxypage = configOptions.proxyurl
        var requestHandle = esri.request({
            url: replaceAll(proxypage, 'proxy.ashx', 'reflect.ashx'),
            form: dojo.byId("frmUploadCSV"),
            load: requestSucceeded,
            error: requestFailed
        });
    }
}

// Upload has succeeded
function requestSucceeded(response) {
    handleCsv(response);
    $("#uploadCSVfile").hide();

    // Hide progress bar
    $("#csvLoadBar").hide();
}

// Upload has failed
function requestFailed(error) {
    // Show the error message
    alert(configOptions.errorMessageText + error.message);

    // Hide progress bar
    $("#csvLoadBar").hide();
}

// Remove CSV layers from map
function removeCSV() {
    // Remove the feature layers
    $.each(csvLayers, function () {
        app.map.removeLayer(this);
    });

    // Reset file input field
    var inputControl = $("#inCSV");
    inputControl.replaceWith(inputControl = inputControl.clone(true));

    //Disable the remove shapefiles button
    $("#removeCSV").prop("disabled", true);

    // Reset array
    csvLayers = [];
}