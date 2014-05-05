// When the add shapefile button is clicked
function uploadShapefile() {
    // Open the dialog
    $("#uploadShapefile").dialog();

    // Setup colour picker
    $('#shapeFile-colour-picker select').colourPicker({
        ico: 'images/Colour_Picker.png',
        title: false
    });

    // Change to upload shapefile form handler
    $('#inShapefile').on("change", function () {        
        // If file API is supported - IE10+
        if (this.files) {
            // Get the filename
            var fileName = this.files[0].name;
        }
        else {
            // Get the filename
            var fileName = this.value;
        }

        // Filename is full path in IE so extract the file name
        if (dojo.isIE) {
            var arr = fileName.split("\\");
            fileName = arr[arr.length - 1];
        }
        // If the file is a zip
        if (fileName.indexOf(".zip") !== -1) {
            // CALL FUNCTION - Generate feature collection from the shapefile
            generateFeatureCollection(fileName);
        }
            // If the file is not a zip
        else {
            // Show the error message
            alert("File needs to be a .zip file");
        }
    });
}

// Generate feature collection from the shapefile
function generateFeatureCollection(fileName) {
    var name = fileName.split(".");

    // Chrome and IE add c:\fakepath to the value - we need to remove it
    name = name[0].replace("c:\\fakepath\\", "");

    // Setup the progress bar and show it
    $('#ShapefileuploadStatus').html("<div id='shapefileLoadBar'>");
    $("#shapefileLoadBar").progressbar({
        value: false
    });
    $("#shapefileLoadBar").show();

    // Define the input params for generate see the rest doc for details - http://www.arcgis.com/apidocs/rest/index.html?generate.html
    var params = {
        'name': name,
        'targetSR': app.map.spatialReference,
        'maxRecordCount': 1000,
        'enforceInputFileSizeLimit': true,
        'enforceOutputJsonSizeLimit': true
    };

    // Generalize features for display Here we generalize at 1:40,000 which is approx 10 meters this should work well when using web mercator.  
    var extent = esri.geometry.getExtentForScale(app.map, 40000);
    var resolution = extent.getWidth() / app.map.width;
    params.generalize = true;
    params.maxAllowableOffset = resolution;
    params.reducePrecision = true;
    params.numberOfDigitsAfterDecimal = 0;

    var myContent = {
        'filetype': 'shapefile',
        'publishParameters': dojo.toJson(params),
        'f': 'json',
        'callback.html': 'textarea'
    };
    // Use the rest generate operation to generate a feature collection from the zipped shapefile
    esri.request({
        url: configOptions.portalUrl + '/sharing/rest/content/features/generate',
        content: myContent,
        form: dojo.byId('frmUploadShapefile'),
        handleAs: 'json',
        load: dojo.hitch(this, function (response) {
            if (response.error) {
                addShapefileErrorHandler(response.error);
                return;
            }
            // Add the shapefile to the map
            addShapefileToMap(response.featureCollection);
        }),
        // Error handler
        error: dojo.hitch(this, addShapefileErrorHandler)
    });
}

// Shapefile upload error handler
function addShapefileErrorHandler(error) {
    // Show the error message
    alert(configOptions.errorMessageText + error.message);
    // Hide progress bar
    $("#shapefileLoadBar").hide();
}

// Add the shapefile to the map
function addShapefileToMap(featureCollection) {
    // Add the shapefile to the map and zoom to the feature collection extent
    // If you want to persist the feature collection when you reload browser you could store the collection in
    // local storage by serializing the layer using featureLayer.toJson()  see the 'Feature Collection in Local Storage' sample
    // for an example of how to work with local storage.
    var shapefileFullExtent;

    dojo.forEach(featureCollection.layers, function (layer) {
        var layer = new esri.layers.FeatureLayer(layer, {
            infoTemplate: new esri.InfoTemplate("Information", "${*}"),
            showAttribution: false,
            outFields: ["*"]
        });
        // Associate the feature with the popup on click to enable highlight and zoom to
        dojo.connect(layer, 'onClick', function (evt) {
            app.map.infoWindow.setFeatures([evt.graphic]);
        });
        changeRenderer(layer);
        shapefileFullExtent = shapefileFullExtent ? shapefileFullExtent.union(layer.fullExtent) : layer.fullExtent;
        shapefileLayers.push(layer);
    });

    // Add the layer to the map and zoom to the extent
    app.map.addLayers(shapefileLayers);
    app.map.setExtent(shapefileFullExtent.expand(1.1), true);

    // Enabled the remove shapefiles button
    $("#removeShapefiles").button("enable");

    // Hide progress bar
    $("#shapefileLoadBar").hide();
}

// Change the colour of the shapefile
function changeRenderer(layer) {
    var symbolColour = hexToRgb('#' + $('#shapefileColours').val());
    var symbolColourArr = symbolColour.split(",");
    var symbolFill = symbolColour + "," + $('#shapefileOpacity').val();
    var symbolFillArr = symbolFill.split(",");

    // Change the default symbol for the feature collection for polygons and points
    var shapefileSymbol = null;
    switch (layer.geometryType) {
        case 'esriGeometryPoint':
            // Set the symbology
            shapefileSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color(symbolColourArr), 1),
            new dojo.Color(symbolFillArr));
            break;
        case 'esriGeometryPolyline':
            // Set the symbology
            shapefileSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color(symbolFillArr), 5);
            break;
        case 'esriGeometryPolygon':
            // Set the symbology
            shapefileSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color(symbolColourArr), 1),
            new dojo.Color(symbolFillArr));
            break;
    }
    if (shapefileSymbol) {
        layer.setRenderer(new esri.renderer.SimpleRenderer(shapefileSymbol));
    }
}

// Remove shapefile layers from map
function removeShapefile() {
    // Remove the feature layers
    $.each(shapefileLayers, function () {
        app.map.removeLayer(this);
    });

    // Reset file input field
    var inputControl = $("#inShapefile");
    inputControl.replaceWith(inputControl = inputControl.clone(true));

    //Disable the remove shapefiles button
    $("#removeShapefiles").prop("disabled", true);

    // Reset array
    shapefileLayers = [];
}