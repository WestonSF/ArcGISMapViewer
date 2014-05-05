// When drawing tool is initialised
function initMeasureTool() {
    // Set offset for marker symbol
    configOptions.measureMarkerSymbol.setOffset(parseInt(configOptions.measureSymbolOffset.x), parseInt(configOptions.measureSymbolOffset.y));

    // Delete previous basemap widget if necessary
    var measurementTool = dijit.byId("measurementTool");
    if (measurementTool) {
        measurementTool.destroyRecursive(true);
    }

    // Setup measure tool
    measureTool = new esri.dijit.Measurement({
        map: app.map,
        defaultAreaUnit: esri.Units.SQUARE_METERS,
        defaultLengthUnit: esri.Units.METERS,
        lineSymbol: configOptions.measureLineSymbol,
        pointSymbol: configOptions.measureMarkerSymbol

    }, dojo.byId('measurementTool'));

    // If ID contains toggle button then add click handler
    $("span[id*=dijit_form_ToggleButton]").on("click", function () {
        changeCursor('measuring');
    });

    // Click handler - measure complete, deactivate tool
    measureTool.on("measure-end", function (evt) {
        // Deactivate the tool
        measureTool.setTool(measureTool.activeTool, false);
    });

    measureTool.startup();
}

function deactivateMeasureTool() {
    // Close tool and clear results
    measureTool.closeTool();
    measureTool.clearResult();


    // If ID contains toggle button then Uncheck button
    $("span[id*=dijit_form_ToggleButton]").attr("checked", false);
    
    // Clear graphics from measure layer
    app.map.graphics.clear();

    // Go back to identify mode
    clickmode = 'identify';
    changeCursor(clickmode);
}
