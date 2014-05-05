// When drawing tool is initialised
function initDrawTool() {
    // Display draw button on toolbar
    $("#btnDraw").css('display', 'block');
    $("#lblDraw").css('display', 'block');

    // Load in colours from config
    for (var j = 0; configOptions.drawcolours.length > j; j++) {

        var $option = $("<option></option>").attr("value", configOptions.drawcolours[j]).text(configOptions.drawcolours[j]);
        // set the default colour
        if (configOptions.defaultDrawColour === configOptions.drawcolours[j]) {
            $option.attr('selected', 'selected');
        }

        $("#drawColours").append($option);
    }

    // Setup drawing layer and add to map
    drawingLayer = new esri.layers.GraphicsLayer();
    app.map.addLayer(drawingLayer);

    // Click handlers for when drawing tool button is clicked
    $("#btnDraw").bind("click", function () {
        drawTool();
    });
    $("#lblDraw").bind("click", function () {
        drawTool();
    });
}

// When drawing tool is opened
function drawTool() {
    // Open the draw dialog box
    $("#drawTool").dialog({
        title: 'Draw on Map',
        width: 380,
        height: 250,
        position: [$(window).width() - 410, $(window).height() - 380]
    });

    // Re-position the dialog of window is resized
    dojo.connect(dijit.byId('map'), 'resize', function () {
        $("#drawTool").dialog({
            position: [$(window).width() - 410, $(window).height() - 380]
        });
    });

    // Setup colour picker
    $('#draw-colour-picker select').colourPicker({
        ico: 'images/Colour_Picker.png',
        title: false
    });

    // Setup the drawing tool
    drawingTool = new esri.toolbars.Draw(app.map);
    var text = false;

    // Setup click handlers for drawing buttons
    $("#btnDrawPoint").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.POINT);
        text = false;
    });
    $("#btnDrawMultiPoint").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.MULTI_POINT);
        text = false;
    });
    $("#btnDrawLine").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.LINE);
        text = false;
    });
    $("#btnDrawPolyline").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.POLYLINE);
        text = false;
    });
    $("#btnDrawFreehandPolyline").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);
        text = false;
    });
    $("#btnDrawPolygon").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.POLYGON);
        text = false;
    });
    $("#btnDrawFreehandPolygon").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
        text = false;
    });
    $("#btnDrawArrow").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.ARROW);
        text = false;
    });
    $("#btnDrawTriangle").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.TRIANGLE);
        text = false;
    });
    $("#btnDrawCircle").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.CIRCLE);
        text = false;
    });
    $("#btnDrawEllipse").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.ELLIPSE);
        text = false;
    });
    $("#btnDrawText").bind("click", function () {
        // Change to draw mode
        changeCursor('draw');
        drawingTool.activate(esri.toolbars.Draw.POINT);

        // Set text boolean to true
        text = true;
    });

    $("#btnDrawClear").bind("click", function () {
        // Clear drawing graphics and deactivate tool
        drawingLayer.clear();
        $('#textInputWrapper').empty();
        // Deactivate drawing tool
        drawingTool.deactivate();
        changeCursor('identify');
        text = false;
    });

    // Setup handler for when graphic is added to map
    dojo.connect(drawingTool, "onDrawEnd", function (geometry) {
        addGraphicToMap(geometry, text);
    });
}

// After drawing has finished
function addGraphicToMap(geometry, text) {
    // Deactivate the toolbar and clear existing graphics 
    drawingTool.deactivate();
    changeCursor('identify');

    // Get the colour
    var symbolColour = hexToRgb('#' + $('#drawColours').val());
    var symbolColourArray = symbolColour.split(",");

    // Setup the symbology
    var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(symbolColourArray), 3, 1.0), new dojo.Color([0, 0, 0, 0]));
    var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(symbolColourArray), 3, 1.0);
    var markerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(symbolColourArray), 1), new dojo.Color(symbolColourArray));

    // Set the symbology based on the geometry type
    var type = geometry.type, symbol;
    if (type === "point" || type === "multipoint") {
        symbol = markerSymbol;
    }
    else if (type === "line" || type === "polyline") {
        symbol = lineSymbol;
    }
    else {
        symbol = polygonSymbol;
    }

    // If adding text to map
    if (text === true) {
        // Add text input to map
        var textInput = $("<input type='text' id='textInput' style='height:20px;width:150px;text-align:center'/>");
        $("#textInputWrapper").append(textInput);
        var screenPoint = app.map.toScreen(geometry);
        $("#textInputWrapper").css('left', screenPoint.x - 75);
        $("#textInputWrapper").css('top', screenPoint.y - 20);
        $('#textInput').focus();

        // Text entry end handlers
        $("#textInput").focusout(function () {
            textEntryEnd();
        });
        $("#textInput").keypress(function (e) {
            if (e.which == 13) {
                textEntryEnd();
            }
        });

        function textEntryEnd() {
            // Setup the font
            var font = new esri.symbol.Font("16px", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD);

            // Set the text
            var textSymbol = new esri.symbol.TextSymbol($('#textInput').val());
            textSymbol.setFont(font);
            textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_MIDDLE);
            textSymbol.setAngle(0);
            
            // Remove text input and add text to map
            $('#textInputWrapper').empty();
            // Add graphic to drawing layer
            drawingLayer.add(new esri.Graphic(geometry, textSymbol));
        }
    }
    else {
        // Add graphic to drawing layer
        drawingLayer.add(new esri.Graphic(geometry, symbol));
    }
}