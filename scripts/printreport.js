// --------------------------------------------------------------------------- Print map ---------------------------------------------------------------------------
// When print tool is initialised
function initPrint() {
    // Set the printing task
    var printAsync = configOptions.printAsync;
    printTask = new esri.tasks.PrintTask(configOptions.printtask, { async: printAsync });

    // If application hasn't loaded yet
    if (initialLoad == false) {
        if (configOptions.printPreserveScale === "true" || configOptions.printPreserveScale === true) {
            // Check the scale radio button
            $('#currentScale').prop("checked", true);
        }
        else {
            $('#currentExtent').prop("checked", true);
        }

        $("#btnPrint").css('display', 'inline');
        $("#mapTitle").val(configOptions.printedmaptitle);
        $("#titlePanePrint").css('display', 'inline');

        $.each(configOptions.printlayouts, function () {
            $("#printlayout").append($("<option style='width:115px;'></option>").attr("value", this.layout).text(this.label));
        });

        var printformats = '<p><label>Format: </label>';
        $.each(configOptions.printformats, function () {
            if (this.value == "PDF") {
                printformats += '<input type="radio" checked="checked" name="outputformat" id="' + this.value + '" value="' + this.value + '"/><label for="' + this.value + '">' + this.label + "</label>";
            }
            else {
                printformats += '<input type="radio" name="outputformat" id="' + this.value + '" value="' + this.value + '"/><label for="' + this.value + '">' + this.label + "</label>";
            }
        });
        printformats += '</p>';

        $("#printformat").append(printformats);

        var printquality = '<p><label>Print Quality: </label>';
        $.each(configOptions.printquality, function () {
            if (this.label == "Med") {
                printquality += '<input type="radio" checked="checked" name="printquality" id="' + this.dpi + '" value="' + this.dpi + '"/><label for="' + this.dpi + '">' + this.label + "</label>";
            }
            else {
                printquality += '<input type="radio" name="printquality" id="' + this.dpi + '" value="' + this.dpi + '"/><label for="' + this.dpi + '">' + this.label + "</label>";
            }
        });
        printquality += '</p>';

        $("#printquality").append(printquality);

        // Handler for when print quality is changed in the print tool
        $("#printlayout").change(function () {
            var selectedOutput = $("#printlayout").val();
            // Hide print quality radio buttons
            if (selectedOutput == "MAP_ONLY") {
                document.getElementById('printquality').style.display = 'none';
                document.getElementById('printtitle').style.display = 'none';
            }
            else {
                document.getElementById('printquality').style.display = 'block';
                document.getElementById('printtitle').style.display = 'block';
            }
        });

        // Click handler for when print tool button clicked
        $("#btnPrint").bind("click", function () {
            // Open accordion at print section
            $("#toolsAccordionPanels").accordion("option", "active", 2);
            $("#toolsAccordion").css({ display: 'inline' });
        });

        // Click handler for when print button clicked
        $("#btnPrintMap").bind("click", function () {
            doPrint();
        });
    }
}


function doPrint() {
    $('#btnPrintMap').attr('disabled', 'disabled').button('disable');
    $('#btnPrintMap').attr("value", "Generating map...");

    // Setup the print progress bar and show it
    $("#printLoadBar").progressbar({
        value: false
    });
    $("#printLoadBar").show();

    var mapwidth = app.map.width;
    var mapheight = app.map.height;
    var printdpi = parseInt($("input:radio[name='printquality']:checked").val());

    // Setup template
    var template = new esri.tasks.PrintTemplate();
    template.format = $("input:radio[name='outputformat']:checked").val();
    template.layout = $("#printlayout").val();

    // If set scale checkbox is checked then preserve scale otherwise extent
    if ($("#currentScale").prop('checked') == true) {
        template.preserveScale = true;
    }
    else {
        template.preserveScale = false;
    }

    template.showAttribution = false;

    // If map only is selected then make print DPI to 96 DPI as having it any more stuffs up the zoom
    if (template.layout == "MAP_ONLY") {
        printdpi = 96;
    }

    // Set export height/width and dpi
    template.exportOptions = {
        width: mapwidth,
        height: mapheight,
        dpi: printdpi
    };

    // Setup the legend for the web export       
    var legendLayers = new Array(new esri.tasks.LegendLayer());

    // For each of the operational layers
    var count = 0
    $.each(configOptions.operationalLayers, function () {
        // Put layer into print legend if print legend config is true
        if (this.printLegend == true) {
            legendLayers[count] = new esri.tasks.LegendLayer();
            legendLayers[count].layerId = this.id;
            count = count + 1;
        }
    });

    template.layoutOptions = {
        "legendLayers": legendLayers,
        "titleText": $("#mapTitle").val(),
        "scalebarUnit": "Kilometers"
    };

    var params = new esri.tasks.PrintParameters();
    params.map = app.map;
    params.template = template;

    // Execute the print task
    printTask.execute(params, printResult, errorPrint);
}

// When print has finished
function printResult(result) {
    // Hide progress bar
    $("#printLoadBar").hide();
    $('#btnPrintMap').attr("value", "Print");
    $('#btnPrintMap').attr('disabled', 'disabled').button('enable');

    // Open the url returned
    window.open(result.url);
}

// If print ends in error
function errorPrint(error) {
    // Hide progress bar
    $("#printLoadBar").hide();
    $('#btnPrintMap').attr("value", "Print");
    $('#btnPrintMap').attr('disabled', 'disabled').button('enable');

    // Show the error message
    alert(configOptions.errorMessageText + error.message);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------- When property report is started with ID being sent ---------------------------------------------------------------------------
// When property report tool is initialised
function initPropertyReport() {
    // Setup the report task
    gppropertyReport = new esri.tasks.Geoprocessor(configOptions.propertyreporttask);

    // If application hasn't loaded yet
    if (initialLoad == false) {
        // Display property report button on toolbar
        $("#btnPropertyReport").css('display', 'block');
        $("#lblPropertyReport").css('display', 'block');

        // Click handlers for when property report button is clicked
        $("#btnPropertyReport").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxidentifyscale) {
                alert("Identify functionality is available from 1:" + configOptions.maxidentifyscale);
            }
            else {
                changeCursor('propertyreport');
            }
        });

        $("#lblPropertyReport").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxidentifyscale) {
                alert("Identify functionality is available from 1:" + configOptions.maxidentifyscale);
            }
            else {
                changeCursor('propertyreport');
            }
        });
    }
}

function generatePropertyReport(ID) {
    $('#showReport').html("Generating report...");
    $('#showReport').css("font-style", "italic");

    // Setup the report progress bar and show it
    $("#propertyReportLoadBar").progressbar({
        value: false
    });
    $("#propertyReportLoadBar").show();

    // Set paramter from config file
    var inputParameter = configOptions.propertyreportinputParameter;

    // Setup parameters object
    var params = {};
    // Add ID of property to parameters
    params[inputParameter] = ID;

    gppropertyReport.submitJob(params, propertycompleteCallback, propertystatusCallback, function (error) {
        // Show the error message
        alert(configOptions.errorMessageText + error.message);
    });
}

function propertycompleteCallback(jobInfo) {
    // Set parameter from config file
    var outputParameter = configOptions.propertyreportoutputParameter;
    if (jobInfo.jobStatus !== "esriJobFailed") {
        gppropertyReport.getResultData(jobInfo.jobId, outputParameter, propertydownloadFile);
    }
    // Hide progress bar
    $("#propertyReportLoadBar").hide();
    $('#showReport').html("View Report");
    $('#showReport').css("font-style", "normal");
}

function propertystatusCallback(jobInfo) {
    var status = jobInfo.jobStatus;
    if (status === "esriJobFailed") {
        alert("Property report generation has failed, please try again");
        // Hide progress bar
        $("#propertyReportLoadBar").hide();
    }
    else if (status === "esriJobSucceeded") {
        // Hide progress bar
        $("#propertyReportLoadBar").hide();
    }
}

function propertydownloadFile(outputFile) {
    var theurl = outputFile.value.url;
    window.open(theurl);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------- Create reports ---------------------------------------------------------------------------
// When drawing tool is initialised
function initReports() {
    // Setup the report task
    gpReports = new esri.tasks.Geoprocessor(configOptions.reportsTask);

    // If application hasn't loaded yet
    if (initialLoad == false) {
        // Display reports button on toolbar
        $("#btnReports").css('display', 'block');
        $("#lblReports").css('display', 'block');

        // Click handlers for when reports button is clicked
        $("#btnReports").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxidentifyscale) {
                alert("Identify functionality is available from 1:" + configOptions.maxidentifyscale);
            }
            else {
                openReportDialog();
            }
        });

        $("#lblReports").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxidentifyscale) {
                alert("Identify functionality is available from 1:" + configOptions.maxidentifyscale);
            }
            else {
                openReportDialog();
            }
        });

        // Handler for ID text box change
        $('#propertyID').on('input', function () {
            // If at least one character then enable submit button
            if ($('#propertyID').val().replace(/ /g, '').length > 0) {
                // Enable reports button
                $('#reportsButton').attr('disabled', 'disabled').button('enable');
            }
            else {
                // Disable reports button
                $('#reportsButton').attr('disabled', 'disabled').button('disable');
            }
        })

        // Load in reports checkboxes from config
        $('#reportsList').append("<input type='checkbox' class='reportsAll'" + "' id='reportAll' title='All'/><font size=\"2\">All</font><br/>");
        // Check all by default
        $("#reportAll").prop("checked", true);
        $.each(configOptions.reports, function () {
            // Add checkbox
            $('#reportsList').append("<input type='checkbox' class='reports' disabled='true'" + "' id='report" + replaceAll(this.name, ' ', '_') + "' title='" + this.name + "'/><font size=\"2\">" + this.name + "</font><br/>");
            // Add scale
            $('#reportsList').append("Scale: <input type='text' class='reportScales' disabled='true'" + "' id='reportScale" + replaceAll(this.name, ' ', '_') + "' title='" + this.name + "' style='width:50px;'/><br/><br/>");
        });

        // Handler for all checkbox change
        $("#reportAll").bind("click", function () {
            // If checkbox checked or not
            if (this.checked == true) {
                // Disable all report checkboxes and scales
                $("input.reports").attr("disabled", true);
                $("input.reportScales").attr("disabled", true);
            }
            else {
                // Enable all report checkboxes and scales
                $("input.reports").removeAttr("disabled");
                $("input.reportScales").removeAttr("disabled");
            }
        });

        // Click handlers for when report submit button is clicked
        $("#reportsButton").bind("click", function () {
            generateReports();
        });
    }
}
// When report tool is opened
function openReportDialog() {
    // Change cursor to reports
    changeCursor('reports');

    // Open the reports dialog box
    $("#createReports").dialog({
        title: 'Reports',
        width: 300,
        height: 400,
        position: [$(window).width() - 330, $(window).height() - 520]
    });

    // Re-position the dialog of window is resized
    dojo.connect(dijit.byId('map'), 'resize', function () {
        $("#createReports").dialog({
            position: [$(window).width() - 330, $(window).height() - 520]
        });
    });
}

function generateReports() {
    $('#reportsButton').attr('disabled', 'disabled').button('disable');
    $('#reportsButton').attr("value", "Generating report...");

    // Setup the reports progress bar and show it
    $("#reportsLoadBar").progressbar({
        value: false
    });
    $("#reportsLoadBar").show();

    // Set paramter from config file
    var inputParameter1 = configOptions.reportsInputParameter1;
    var inputParameter2 = configOptions.reportsInputParameter2;

    // Setup parameters object
    var params = {};
    // Add ID of property from property text input to parameters
    params[inputParameter1] = $('#propertyID').val();

    // If all checkbox is not checked
    if ($("#reportAll").prop("checked") == false) {
        // For each of the reports
        var mapsJSON = "[";
        var count = 0;
        $.each(configOptions.reports, function () {
            // If it's checked
            if ($("#report" + this.name).prop("checked") == true) {
                // Get the map and scale
                var mapJSON = "{'map':'" + replaceAll(this.name, ' ', '_') + "','scale':'" + $("#reportScale" + replaceAll(this.name, ' ', '_')).val() + "'}";

                // If not first map, add comma
                if (count > 0) {
                    mapsJSON = mapsJSON + "," + mapJSON;
                }
                else {
                    mapsJSON = mapsJSON + mapJSON;
                }
                count = count + 1;
            }         
        });
        mapsJSON = mapsJSON + "]";
        // If no maps selected, remove brackets
        if (mapsJSON == "[]") {
            mapsJSON = "";
        }

        params[inputParameter2] = mapsJSON;
    }
    else {
        params[inputParameter2] = "";
    }

    gpReports.submitJob(params, reportscompleteCallback, reportsStatusCallback, function (error) {
        // Show the error message
        alert(configOptions.errorMessageText + error.message);
    });
}

function reportscompleteCallback(jobInfo) {
    // Set parameter from config file
    var outputParameter = configOptions.reportsOutputParameter;
    if (jobInfo.jobStatus !== "esriJobFailed") {
        gpReports.getResultData(jobInfo.jobId, outputParameter, reportsdownloadFile);
    }
    // Hide progress bar
    $("#reportsLoadBar").hide();
    $('#reportsButton').attr("value", "View Report");
    $('#reportsButton').attr('disabled', 'disabled').button('enable');
}

function reportsStatusCallback(jobInfo) {
    var status = jobInfo.jobStatus;
    if (status === "esriJobFailed") {
        alert(configOptions.errorMessageText + "Report generation has failed, please try again");
        // Hide progress bar
        $("#reportsLoadBar").hide();
        $('#reportsButton').attr("value", "View Report");
        $('#reportsButton').attr('disabled', 'disabled').button('enable');
    }
    else if (status === "esriJobSucceeded") {
        // Hide progress bar
        $("#reportsLoadBar").hide();
        $('#reportsButton').attr("value", "View Report");
        $('#reportsButton').attr('disabled', 'disabled').button('enable');
    }
}

function reportsdownloadFile(outputFile) {
    var theurl = outputFile.value.url;
    window.open(theurl);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
