// --------------------------------------------------------------------------- Global parameters --------------------------------------------------------------------------- 
// Application array
var app = {};
// Initial application load
var initialLoad = false;
// AGS Online Map
var agsOnlineMap;
// Levels of detail for map
var lods;
// Popup style for desktop and embed maps
var popup;
// Slider style for maps
var includeSlider
var sliderSize;
// The current click mode
var clickmode;
var loading;
// Identify task
var identifyTask
// Identify parameters
var identifyParams
// Initial theme
var initialTheme;
// List of themes used
var themesUsed = [];
var lastThemeUsed;
// Operational layers from configuration
var operationalLayers;
// List of layer groups used
var layerGroupsUsed = [];
var lastLayerGroupUsed;
// Layer added to map handler
var layerAddedHandler;
// Layers added counter
var layersAdded = 0;
// Count for number of times secure login has appeared
var secureLoginCount = 0;
// Visible layers array
var visible = [];
// Basemap gallery
var basemapGallery;
// Basemap opacity
var basemapOpacity;
var slider;

// Navigation toolbar
var navToolbar;
// Legend tool
var legend;
// Bookmarks tool
var bookmarks;
// Shape file layers
var shapefileLayers = [];
// CSV layers
var csvLayers = [];
var latFieldStrings, longFieldStrings;
// Measure tool
var measureTool
var measureLayer;
var getCursorCoordinates;
// Draw tool
var drawingTool;
var drawingLayer;
// Print and report tools
var printTask;
var gppropertyReport;
var gpReports;

// Gallery portal of apps
var portal;
var group;
var nextQueryParams;
var queryParams;

// Parameters from URL object array
var urlParams = {};

// Get the current page on - desktop, mobile or embed
var pagePath = window.location.pathname;
var currentPage = pagePath.substring(pagePath.lastIndexOf('/') + 1);
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      


// --------------------------------------------------------------------------- Load the functionality --------------------------------------------------------------------------- 
// Get the IE version and push into jQuery browser object
jQuery.browser = {}; (function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true; jQuery.browser.version = RegExp.$1;
    }
})();
// If browser is IE8 or lower
if ((jQuery.browser.msie == true) && (jQuery.browser.version <= 8)) {
    // Move the scroll bar to the layers tab
    $("#layerTabs").css('height', '95%');
    $("#layerTabs").css('overflow-y', 'auto');
}

// Desktop version
if (currentPage.indexOf("map") != -1) {
    // Load the application funtionality
    var functionality = [
        'scripts/plugins/blockUI.js',
        'scripts/plugins/colourPicker.js',
        'scripts/identify.js',
        'scripts/search.js',
        'scripts/printreport.js',
        'scripts/addXYdata.js',
        'scripts/addshapefile.js',
        'scripts/measure.js',
        'scripts/draw.js',
        'scripts/closestfacility.js'
    ];

    scriptLoadCount = 0;
    for (i = 0; i < functionality.length; i++) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = functionality[i];
        head.appendChild(script);

        // If browser is IE8 or lower
        if ((jQuery.browser.msie == true) && (jQuery.browser.version <= 8)) {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    // Once script has loaded add to counter
                    scriptLoadCount++;
                    // When all functionality has been loaded
                    if (scriptLoadCount == (functionality.length - 1)) {
                        // When dojo has loaded go to the first init function
                        require([
                            // Esri modules
                            "esri/map",
                            "esri/arcgis/utils",
                            "esri/tasks/geometry",
                            "esri/layers/FeatureLayer",
                            "esri/layers/agstiled",
                            "esri/layers/agsdynamic",
                            "esri/dijit/Popup",
                            "esri/dijit/Print",
                            "esri/tasks/identify",
                            "esri/toolbars/navigation",
                            "esri/IdentityManager",
                            "esri/toolbars/draw",

                            // Esri widgets
                            "esri/dijit/Geocoder",
                            "esri/dijit/BasemapGallery",
                            "esri/dijit/Legend",
                            "esri/dijit/Measurement",
                            "esri/dijit/Bookmarks",
                            "esri/dijit/Scalebar",

                            // Dojo modules
                            "dojo/domReady!"
                        ], init);
                    }
                    script.onreadystatechange = null;
                }
            }
        }

        // Other browsers
        script.onload = function () {
            // Once script has loaded add to counter
            scriptLoadCount++;
            // When all functionality has been loaded
            if (scriptLoadCount == functionality.length) {
                // When dojo has loaded go to the first init function
                require([
                    // Esri modules
                    "esri/map",
                    "esri/arcgis/utils",
                    "esri/tasks/geometry",
                    "esri/layers/FeatureLayer",
                    "esri/layers/agstiled",
                    "esri/layers/agsdynamic",
                    "esri/dijit/Popup",
                    "esri/dijit/Print",
                    "esri/tasks/identify",
                    "esri/toolbars/navigation",
                    "esri/IdentityManager",
                    "esri/toolbars/draw",

                    // Esri widgets
                    "esri/dijit/Geocoder",
                    "esri/dijit/BasemapGallery",
                    "esri/dijit/Legend",
                    "esri/dijit/Measurement",
                    "esri/dijit/Bookmarks",
                    "esri/dijit/Scalebar",

                    // Dojo modules
                    "dojo/domReady!"
                ], init);
            }
        }
    }

    // Load stylesheets
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/BLACKTHEME/jquery-ui-1.10.3.min.css"
    });
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/desktop.css"
    });
}
// Mobile version
if (currentPage.indexOf("mobile") != -1) {
    // Load the application funtionality
    var functionality = [
        'scripts/identify.js',
        'scripts/search.js',
        'scripts/printreport.js',
        'scripts/closestfacility.js',
    ];

    scriptLoadCount = 0;
    for (i = 0; i < functionality.length; i++) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = functionality[i];
        head.appendChild(script);

        // If browser is IE8 or lower
        if ((jQuery.browser.msie == true) && (jQuery.browser.version <= 8)) {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    // Once script has loaded add to counter
                    scriptLoadCount++;
                    // When all functionality has been loaded
                    if (scriptLoadCount == (functionality.length - 1)) {
                        // When dojo has loaded go to the first init function
                        require([
                            // Esri modules
                            "esri/map",
                            "esri/arcgis/utils",
                            "esri/tasks/geometry",
                            "esri/layers/FeatureLayer",
                            "esri/layers/agstiled",
                            "esri/layers/agsdynamic",
                            "esri/dijit/Print",
                            "esri/tasks/identify",
                            "esri/IdentityManager",

                            // Esri widgets
                            "esri/dijit/Geocoder",
                            "esri/dijit/BasemapGallery",
                            "esri/dijit/Legend",
                            "esri/dijit/Measurement",
                            "esri/dijit/Scalebar",

                            // Dojo modules
                            "dojo/domReady!"
                        ], init);
                    }
                    script.onreadystatechange = null;
                }
            }
        }

        // Other browsers
        script.onload = function () {
            // Once script has loaded add to counter
            scriptLoadCount++;
            // When all functionality has been loaded
            if (scriptLoadCount == functionality.length) {
                // When dojo has loaded go to the first init function
                require([
                    // Esri modules
                    "esri/map",
                    "esri/arcgis/utils",
                    "esri/tasks/geometry",
                    "esri/layers/FeatureLayer",
                    "esri/layers/agstiled",
                    "esri/layers/agsdynamic",
                    "esri/dijit/Print",
                    "esri/tasks/identify",
                    "esri/IdentityManager",

                    // Esri widgets
                    "esri/dijit/Geocoder",
                    "esri/dijit/BasemapGallery",
                    "esri/dijit/Legend",
                    "esri/dijit/Measurement",
                    "esri/dijit/Scalebar",

                    // Dojo modules
                    "dojo/domReady!"
                ], init);
            }
        }
    }

    // Load stylesheets
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/BLACKTHEME/jquery-ui-1.10.3.min.css"
    });
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "libraries/jQueryMobile/1.3.2/jquery.mobile-1.3.2.min.css"
    });
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/mobile.css"
    });
}
// Embed version
if (currentPage.indexOf("embed") != -1) {
    // Load the application funtionality
    var functionality = [
        'scripts/identify.js',
        'scripts/search.js',
        'scripts/printreport.js'
    ];

    scriptLoadCount = 0;
    for (i = 0; i < functionality.length; i++) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = functionality[i];
        head.appendChild(script);

        // If browser is IE8 or lower
        if ((jQuery.browser.msie == true) && (jQuery.browser.version <= 8)) {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    // Once script has loaded add to counter
                    scriptLoadCount++;
                    // When all functionality has been loaded
                    if (scriptLoadCount == (functionality.length - 1)) {
                        // When dojo has loaded go to the first init function
                        require([
                            // Esri modules
                            "esri/map",
                            "esri/arcgis/utils",
                            "esri/tasks/geometry",
                            "esri/layers/FeatureLayer",
                            "esri/layers/agstiled",
                            "esri/layers/agsdynamic",
                            "esri/dijit/Print",
                            "esri/tasks/identify",
                            "esri/IdentityManager",

                            // Esri widgets
                            "esri/dijit/Geocoder",
                            "esri/dijit/BasemapGallery",
                            "esri/dijit/Legend",
                            "esri/dijit/Measurement",
                            "esri/dijit/Scalebar",

                            // Dojo modules
                            "dojo/domReady!"
                        ], init);
                    }
                    script.onreadystatechange = null;
                }
            }
        }

        // Other browsers
        script.onload = function () {
            // Once script has loaded add to counter
            scriptLoadCount++;
            // When all functionality has been loaded
            if (scriptLoadCount == functionality.length) {
                // When dojo has loaded go to the first init function
                require([
                    // Esri modules
                    "esri/map",
                    "esri/arcgis/utils",
                    "esri/tasks/geometry",
                    "esri/layers/FeatureLayer",
                    "esri/layers/agstiled",
                    "esri/layers/agsdynamic",
                    "esri/dijit/Print",
                    "esri/tasks/identify",
                    "esri/IdentityManager",

                    // Esri widgets
                    "esri/dijit/Geocoder",
                    "esri/dijit/BasemapGallery",
                    "esri/dijit/Legend",
                    "esri/dijit/Measurement",
                    "esri/dijit/Scalebar",

                    // Dojo modules
                    "dojo/domReady!"
                ], init);
            }
        }
    }

    // Load stylesheets
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/BLACKTHEME/jquery-ui-1.10.3.min.css"
    });
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/embed.css"
    });
}
// Gallery version
if (currentPage.indexOf("gallery") != -1) {
    // Load the application funtionality
    var functionality = [
        'scripts/gallery.js'
    ];

    scriptLoadCount = 0;
    for (i = 0; i < functionality.length; i++) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = functionality[i];
        head.appendChild(script);

        // If browser is IE8 or lower
        if ((jQuery.browser.msie == true) && (jQuery.browser.version <= 8)) {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    // Once script has loaded add to counter
                    scriptLoadCount++;
                    // When all functionality has been loaded
                    if (scriptLoadCount == functionality.length) {
                        // When dojo has loaded go to the first init function
                        require([
                            // Esri modules
                            "esri/tasks/identify",
                            "esri/arcgis/Portal",

                            // Esri widgets
                            "esri/dijit/BasemapGallery",

                            // Dojo modules
                            "dojox/lang/aspect",
                            "dojo/domReady!"
                        ], init);
                    }
                    script.onreadystatechange = null;
                }
            }
        }

        // Other browsers
        script.onload = function () {
            // Once script has loaded add to counter
            scriptLoadCount++;
            // When all functionality has been loaded
            if (scriptLoadCount == functionality.length) {
                // When dojo has loaded go to the first init function
                require([
                    // Esri modules
                    "esri/tasks/identify",
                    "esri/arcgis/Portal",

                    // Esri widgets
                    "esri/dijit/BasemapGallery",

                    // Dojo modules
                    "dojox/lang/aspect",
                    "dojo/domReady!"
                ], init);
            }
        }
    }

    // Load stylesheets
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/BLACKTHEME/jquery-ui-1.10.3.min.css"
    });
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        href: "css/gallery.css"
    });
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      


// --------------------------------------------------------------------------- URL query string functionality --------------------------------------------------------------------------- 
// Get querystring parameters if any
(function () {
    var e,
      a = /\+/g,  // Regex for replacing addition symbol with a space 
      r = /([^&=]+)=?([^&]*)/g,
      d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
      q = window.location.search.substring(1);

    while (e = r.exec(q))
        urlParams[d(e[1])] = d(e[2]);
})();

// URL Querystring parameters
var urlParam_xmin;
var urlParam_xmax;
var urlParam_ymin;
var urlParam_ymax;
var urlParam_baseMap;
var urlParam_basemapOpacity;
var urlParam_layerGroup;
var urlParam_theme;
var urlParam_search;

// Set coordinates extent from URL 
if (parseInt(urlParams["xmin"]))
    urlParam_xmin = parseInt(urlParams["xmin"]);
if (parseInt(urlParams["xmax"]))
    urlParam_xmax = parseInt(urlParams["xmax"]);
if (parseInt(urlParams["ymin"]))
    urlParam_ymin = parseInt(urlParams["ymin"]);
if (parseInt(urlParams["ymax"]))
    urlParam_ymax = parseInt(urlParams["ymax"]);

// Set basemap from URL  
if (urlParams["baseMap"])
    urlParam_baseMap = urlParams["baseMap"];

// Set basemap opacity from URL
if (parseInt(urlParams["basemapOpacity"]))
    urlParam_basemapOpacity = parseInt(urlParams["basemapOpacity"]);

// Set layer group to be selected from URL - Convert underscores to spaces
if (urlParams["layerGroup"])
    urlParam_layerGroup = replaceAll(urlParams["layerGroup"], '_', ' ');

// Set theme to be selected from URL - Convert underscores to spaces
if (urlParams["theme"])
    urlParam_theme = replaceAll(urlParams["theme"], '_', ' ');

// Search from URL
if (urlParams["search"])
    urlParam_search = urlParams["search"];
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      


// --------------------------------------------------------------------------- Initial function after JS library has loaded ---------------------------------------------------------------------------  
function init() {
    console.log("FUNCTION - init");

    // Load the configuration file
    initVariables();

    // If gallery version
    if (currentPage.indexOf("gallery") != -1) {
        galleryInit();
    }
    // Desktop, mobile and embed versions - Setup buttons and UI
    else {
        // Load the stylesheets
        $("head").append("<link>");
        var css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            href: configOptions.jsapiaddress + "/js/dojo/dijit/themes/soria/soria.css"
        });
        $("head").append("<link>");
        var css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            href: configOptions.jsapiaddress + "/js/esri/css/esri.css"
        });

        $('#toolbar').addClass('shadow');

        // Setup google analytics to track site usage
        loadGoogleAnalytics(configOptions.googleanalyticsID);

        // Set the web title
        document.title = configOptions.webTitle;

        // Set jQuery buttons
        $("input[type=button], button")
        .button()
        .click(function (event) {
            event.preventDefault();
        });

        // Set jQuery tooltips
        $(document).tooltip();

        // Setup tools accordion and accordion panels to keep their native height
        $("#toolsAccordionPanels").accordion({
            heightStyle: "fill"
        });
        // Setup basemaps/themes accordion and accordion panels to expand height
        $("#themesWrapper").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });
        $("#basemapsWrapper").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });

        // Setup tools accordion resizer and make draggable
        $("#toolsAccordion").resizable({
            minHeight: 300,
            minWidth: 280,
            maxHeight: 1000,
            maxWidth: 500,
            resize: function () {
                $("#toolsAccordionPanels").accordion("refresh");
            }
        });
        $('#toolsAccordion').draggable({ handle: '#tools, #toolsTitle, #layerTabs, #layerTabsTitle, #print, #printTitle' });

        // If desktop version
        if (currentPage.indexOf("map") != -1) {
            // Initialise layers and legend tabs
            $("#layerTabs").tabs();
            // Create new tab and reference
            $("#layerTabs ul").append("<li><a href='#mapsTab'>Maps</a></li>");
            $("#layerTabs").append("<div id='mapsTab'></div>");

            // When displaying individual layers in groupings go to this function
            if (configOptions.displaylayers === true || configOptions.displaylayers === "true") {
                $("#layerTabs ul").append("<li><a href='#layersTab'>Layers</a></li>");
                $("#layerTabs").append("<div id='layersTab'></div>");
                // If display layer mode button
                if (configOptions.displayLayerMode == "true" || configOptions.displayLayerMode == true) {
                    // Add all layers tab
                    $("#layerTabs ul").append("<li><a href='#layersTabAll'>Layers</a></li>");
                    $("#layerTabs").append("<div id='layersTabAll'></div>");
                }
            }

            $("#layerTabs ul").append("<li><a href='#legendTab'>Legend</a></li>");
            $("#layerTabs").append("<div id='legendTab'></div>");
            // Refresh tabs
            $("#layerTabs").tabs("refresh");
            // Activate first tab
            $("#layerTabs").tabs({ active: 0 });

            // Display the print tool
            if (configOptions.displayprint === "true" || configOptions.displayprint === true) {
                // Set jQuery radio buttons
                $("#printformat").buttonset();
                $("#printquality").buttonset();
                $("#printScaleOption").buttonset();
            }
        }

        // Get the window height and set the accordian dragger         
        var windowHeight = $(window).height();

        if (windowHeight > 800) {
            $("#toolsAccordion").height(windowHeight * 0.64);
        }
        else {
            $("#toolsAccordion").height(windowHeight * 0.66);
        }

        // Set the logos - Desktop version
        if (currentPage.indexOf("map") != -1) {
            // Splash screen logo
            var logo = document.createElement("div");
            logo.innerHTML = configOptions.logo;
            splashLogo.appendChild(logo);

            // Logo at bottom left
            var logo2 = document.createElement("div");
            logo2.innerHTML = configOptions.logo;
            companyLogo.appendChild(logo2);
            // Set size of logo in css
            logo2.style.height = (logo2.offsetHeight - 5) + "px";
            logo2.style.width = logo2.offsetWidth;

            // Set the splash screen title
            var texttitleElem = document.createElement("div");
            texttitleElem.innerHTML = configOptions.splashscreentitletext;
            splashTitle.appendChild(texttitleElem);

            // Set the splash screen content
            var textElem = document.createElement("div");
            textElem.innerHTML = configOptions.splashscreentext;
            splashText.appendChild(textElem);
        }

        latFieldStrings = configOptions.latFieldStrings;
        longFieldStrings = configOptions.longFieldStrings;

        // Set geometry service
        esri.config.defaults.geometryService = new esri.tasks.GeometryService(configOptions.geometryserviceurl);

        // Map configurations
        // Proxy needed for large requests and/or secure services
        esri.config.defaults.io.proxyUrl = configOptions.proxyurl;
        esri.config.defaults.io.alwaysUseProxy = configOptions.alwaysuseproxy;
        esri.config.defaults.map.zoomDuration = configOptions.zoomDuration;
        esri.config.defaults.map.zoomRate = configOptions.zoomRate;
        esri.config.defaults.map.panDuration = configOptions.panDuration;
        esri.config.defaults.map.panRate = configOptions.panRate;

        // Setup symbology
        esri.config.defaults.map.pointSymbol = configOptions.markerSymbol;

        // If using themes, display the dropdown
        if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
            // Desktop version
            if (currentPage.indexOf("map") != -1) {
                // Load themes into dropdown
                for (var j = 0; configOptions.themes.length > j; j++) {
                    $("#selectTheme").append($("<option></option>").attr("value", configOptions.themes[j].theme).text(configOptions.themes[j].theme));
                }

                initialTheme = configOptions.initialtheme;
                // If URL theme provided
                if (urlParam_theme) {
                    initialTheme = urlParam_theme;
                }

                // Select the initial theme
                document.getElementById("selectTheme").value = initialTheme;
            }
            // Embed version
            if (currentPage.indexOf("embed") != -1) {
                initialTheme = configOptions.initialtheme;
                // If URL theme provided
                if (urlParam_theme) {
                    initialTheme = urlParam_theme;
                }
            }
            // Mobile version
            if (currentPage.indexOf("mobile") != -1) {
                var TOChtml = "";
                var checked = "";
                TOChtml += '<fieldset data-role="controlgroup" data-type="vertical">';
                initialTheme = configOptions.initialtheme;
                // If URL theme provided
                if (urlParam_theme) {
                    initialTheme = urlParam_theme;
                }
                $.each(configOptions.themes, function () {
                    if (this.theme == initialTheme) {
                        checked = ' checked="true" ';
                    }
                    else {
                        checked = "";
                    }
                    TOChtml += '<input type="radio" name="theme" id="theme' + replaceAll(this.theme, ' ', '_') + '"' + checked + 'value="' + this.theme + '" /><label for="theme' + replaceAll(this.theme, ' ', '_') + '">' + this.theme + '</label>';
                });
                TOChtml += '</fieldset>';
                $('#themes').html(TOChtml);
                // Initialise jQuery on div
                $("#themes").trigger('create');
            }

            // FUNCTION - Load the theme
            themeLoad();
        }

        // If not using AGS Online web map
        if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
            var initialExtent
            // If parameters provided via URL, use these
            if (urlParam_xmin >= configOptions.extentBounds.xmin && urlParam_ymin >= configOptions.extentBounds.ymin && urlParam_xmax <= configOptions.extentBounds.xmax && urlParam_ymax <= configOptions.extentBounds.ymax) // TODO - need to update these values so the area is wider     
            {
                initialExtent = new esri.geometry.Extent({
                    "xmin": urlParam_xmin,
                    "ymin": urlParam_ymin,
                    "xmax": urlParam_xmax,
                    "ymax": urlParam_ymax,
                    "spatialReference": {
                        "wkid": parseInt(configOptions.spatialReference.WKID)
                    }
                });
            }
            // Otherwise use config file
            else {
                initialExtent = new esri.geometry.Extent({
                    "xmin": configOptions.initialExtent.xmin,
                    "ymin": configOptions.initialExtent.ymin,
                    "xmax": configOptions.initialExtent.xmax,
                    "ymax": configOptions.initialExtent.ymax,
                    "spatialReference": {
                        "wkid": parseInt(configOptions.spatialReference.WKID)
                    }
                });
            }
        }

        // Setup zoom slider style
        includeSlider = false;
        sliderSize = "large";
        // If compact slider in config options or not using desktop version
        if (configOptions.usecompactslider === "true" || configOptions.usecompactslider === true || currentPage.indexOf("map") == -1) {
            includeSlider = true;
            sliderSize = "small";
            // Hide full slider
            $("#zoomSlider").css('display', 'none');
        }

        // If not using AGS Online web map
        if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
            // Setup popups - Desktop and embed version
            if ((currentPage.indexOf("map") != -1) || (currentPage.indexOf("embed") != -1)) {
                // Setup popup and make draggable
                $("#popup").resizable({
                    minHeight: configOptions.infowWindowSize[0],
                    minWidth: configOptions.infowWindowSize[1],
                    maxHeight: 600,
                    maxWidth: 600,
                    resize: function () {

                    }
                });
                $('#popup').draggable({ handle: '#identifyTabs, #directionsContent' });

                popup = new esri.dijit.Popup(null, "popup");

                // Don't display the maximise button
                dojo.connect(popup, "onShow", function (evt) {
                    dojo.query(".maximize").addClass('displaynone');
                });
            }

            // If custom lods are set then load them in, otherwise pick them up from the first basemap
            if (configOptions.setlods == "true" || configOptions.setlods == true) {
                app.map = new esri.Map("map", {
                    wrapAround180: configOptions.wraparound180,
                    extent: initialExtent,
                    lods: configOptions.lods,
                    infoWindow: popup,
                    slider: includeSlider,
                    sliderStyle: sliderSize,
                    navigationMode: "css-transforms",
                    fadeOnZoom: true,
                    logo: false,
                    showAttribution: false
                });
            }
            else {
                app.map = new esri.Map("map", {
                    wrapAround180: configOptions.wraparound180,
                    extent: initialExtent,
                    infoWindow: popup,
                    slider: includeSlider,
                    sliderStyle: sliderSize,
                    navigationMode: "css-transforms",
                    fadeOnZoom: true,
                    logo: false,
                    showAttribution: false
                });

                // Set the theme for the popups
                dojo.addClass(app.map.infoWindow.domNode, "customTheme");
            }

            // Setup initial basemap and add to the map
            $.each(configOptions.basemaps, function () {
                if (this.basemap.id == configOptions.initialbasemap) {
                    app.basemap = new esri.layers.ArcGISTiledMapServiceLayer(this.basemap.layers[0].url);

                }
            });
            // Add the first basemap and create the basemap gallery
            app.map.addLayer(app.basemap);

            // After map has loaded - CALL FUNCTION - Setup map functionality
            app.map.on("load", initFunctionality);

            // Set the operational layers
            operationalLayers = configOptions.operationalLayers;
        }
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  



// --------------------------------------------------------------------------- Setup UI ---------------------------------------------------------------------------  
function loadUI() {
    // Desktop version
    if (currentPage.indexOf("map") != -1) {
        // Show tools if in config file
        if (configOptions.onloadTool === "tools") {
            $("#toolsAccordionPanels").accordion("option", "active", 0);
            $("#toolsAccordion").css({ display: 'inline' });
        }
        if (configOptions.onloadTool === "layers") {
            $("#toolsAccordionPanels").accordion("option", "active", 1);
            $("#toolsAccordion").css({ display: 'inline' });
        }
        if (configOptions.onloadTool === "print") {
            $("#toolsAccordionPanels").accordion("option", "active", 2);
            $("#toolsAccordion").css({ display: 'inline' });
        }


        if (configOptions.displayclearmap === "true" || configOptions.displayclearmap === true) {
            $("#btnClearMap").css('display', 'block');
            $("#lblClearMap").css('display', 'block');
        }

        if (configOptions.displaystreetview === "true" || configOptions.displaystreetview === true) {
            $("#btnGoogleStreetView").css('display', 'block');
            $("#lblGoogleStreetView").css('display', 'block');
        }

        // Show the search tool if required
        if ((configOptions.displaysearch === "true" || configOptions.displaysearch === true)) {

        }

        if (configOptions.displaytoolbar === "true" || configOptions.displaytoolbar === true) {
            $("#toolbar").css('display', 'inline-block');
        }

        if (configOptions.displaylayerlist === "true" || configOptions.displaylayerlist === true || configOptions.displaylegend === true || configOptions.displaylegend === true) {
            $("#btnLayers").css('display', 'inline');
        }
        else {
            esri.hide(dojo.byId('titlePaneLayers'));
        }

        if (configOptions.displayCursorMode === "true" || configOptions.displayCursorMode === true) {
            $("#cursorMode").css('display', 'inline');
        }

        if (configOptions.displaytools === "true" || configOptions.displaytools === true) {
            $("#btnTools").css('display', 'inline');
        }
        else {
            esri.hide(dojo.byId('titlePaneTools'));
        }

        if (configOptions.displayshare === "true" || configOptions.displayshare === true) {
            $("#btnShareMap").css('display', 'inline');
            $("#btnBookmark").css('display', 'inline');
        }

        if (configOptions.displaynavigation === "true" || configOptions.displaynavigation === true) {
            $("#navigation").css('display', 'inline');
        }

        if (configOptions.displaycoordinates === "true" || configOptions.displaycoordinates === true) {
            $("#mapInfo").css('display', 'inline');
            $("#mapCoords").css('display', 'inline');
            $("#mapCoords").html('Map Coordinates');
        }

        // Display basemaps accordion
        if (configOptions.displaybasemaps === "true" || configOptions.displaybasemaps === true) {
            $("#basemapsWrapper").css('display', 'inline');
            // If no themes then move basemaps over
            if (configOptions.usethemes !== "true" && configOptions.usethemes !== true) {
                $('#basemapsWrapper').css("right", "5px");
                $('#basemapSliderWrapper').css("right", "160px");
            }
        }

        // If using themes, display the dropdown
        if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
            // Display the themes dropdown
            $("#themesWrapper").css('display', 'inline');

            // Setup themes and handler when theme changed
            $("#selectTheme").bind("change", function () {
                themeLoad();
            });
        }

        if (configOptions.displaytransparencyslider === "true" || configOptions.displaytransparencyslider === true) {
            $("#basemapSliderWrapper").css('display', 'inline');

            // If no basemaps and themes move slider over
            if (configOptions.displaybasemaps !== "true" && configOptions.displaybasemaps !== true && configOptions.usethemes !== "true" && configOptions.usethemes !== true) {
                $('#basemapSliderWrapper').css("right", "10px");
            }
        }

        if (configOptions.displaylocate === "true" || configOptions.displaylocate === true) {
            $("#btnLocate").css('display', 'block');
            $("#lblLocate").css('display', 'block');
        }

        if (configOptions.displayClosestFacility === "true" || configOptions.displayClosestFacility === true) {
            $("#btnClosestFeature").css('display', 'block');
            $("#lblClosestFeature").css('display', 'block');

            // Change label
            document.getElementById('lblClosestFeature').innerHTML = 'Closest ' + configOptions.facilityName;
            document.getElementById('lblClosestFeature').title = 'Closest ' + configOptions.facilityName + ' (Click here to activate, then on map to select)';
            document.getElementById('btnClosestFeature').title = 'Closest ' + configOptions.facilityName + ' (Click here to activate, then on map to select)';
        }

        // Show the splash screen if in config and no url search parameter
        if ((configOptions.displaysplashscreen === "true" || configOptions.displaysplashscreen === true) && (!urlParam_search)) {
            // If there is no cookie and splash screen hasn't been shown in this session
            if (getCookie('MapViewer') == null) {
                // Use custom css
                $.blockUI.defaults.css = {};

                // Display the splash screen
                $.blockUI({ message: $('#splashscreen') });

                // Accept button click handler
                $('#acceptButton').click(function () {
                    $.unblockUI();
                    $.blockUI.defaults.css = {};
                    setCookie('MapViewer', '1');
                    return false;
                });
            };
        };

        $("#StreetView").dialog({
            autoOpen: false,
            modal: true,
            height: "440",
            width: "710",
            position: 'center',
            resizable: false
        });

        // Show the help button if in config
        if (configOptions.displayhelp === "true" || configOptions.displayhelp === true) {
            $("#btnHelp").css('display', 'inline');

            $("#help").css('display', 'inline');
            var divElement = document.getElementById("help");
            divElement.innerHTML = "<a href=\"" + configOptions.helpUrl + "\" target=\"_blank\">How to Use the Viewer</a>";

            $('#btnHelp').bind("click", function () {
                // Go to link in the config
                window.open(configOptions.helpUrl, '_blank');
            });
        }
    }

    // Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        // Display my location
        if (configOptions.displaylocate === "true" || configOptions.displaylocate === true) {
            $("#btn-locate").css('display', 'block');
        }

        // Display property report
        if (configOptions.displaypropertyreport === "true" || configOptions.displaypropertyreport === true) {
            $("#btn-propertyreport").css('display', 'block');
        }

        if (configOptions.displayClosestFacility === "true" || configOptions.displayClosestFacility === true) {
            $("#btn-closestFeature").css('display', 'block');
            // Change label
            $("#btn-closestFeature").html("Closest " + configOptions.facilityName);
        }
    }

    // Embed version
    if (currentPage.indexOf("embed") != -1) {
        if (configOptions.displaytoolbar === "true" || configOptions.displaytoolbar === true) {
            // Shrink the toolbar
            $('#toolbar').css("width", "200px");
            $("#toolbar").css('display', 'inline-block');
        }
        // Show the search tool if required
        if ((configOptions.displaysearch === "true" || configOptions.displaysearch === true)) {

        }
    }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Event handlers ---------------------------------------------------------------------------  
function loadeventHandlers() {
    // Add listener for when map is clicked
    app.map.on("click", mapClick);

    // Desktop version
    if (currentPage.indexOf("map") != -1) {
        // If the layer button is clicked
        $("#btnLayers").bind("click", function () {
            // Open accordion at layers section
            $("#toolsAccordionPanels").accordion("option", "active", 1);
            $("#toolsAccordion").css({ display: 'inline' });
        });

        $("#btnIdentify").bind("click", function () {
            // Change cursor and update mode button
            changeCursor('identify');
        });

        $("#btnTools").bind("click", function () {
            // Open accordion at tools section
            $("#toolsAccordionPanels").accordion("option", "active", 0);
            $("#toolsAccordion").css({ display: 'inline' });
        });

        // initialize navigation buttons
        $("#btnZoomToFullExtent").bind("click", function () {
            zoomToFullExtent();
        });

        $("#btnPanNorth").bind("click", function () {
            app.map.panUp();
        });

        $("#btnPanSouth").bind("click", function () {
            app.map.panDown();
        });

        $("#btnPanWest").bind("click", function () {
            app.map.panLeft();
        });

        $("#btnPanEast").bind("click", function () {
            app.map.panRight();
        });

        // When locate button clicked
        $("#btnLocate").bind("click", function () {
            gotoLocation();
        });

        $("#lblLocate").bind("click", function () {
            gotoLocation();
        });

        // When closest feature button clicked
        $("#btnClosestFeature").bind("click", function () {
            // Load module
            require([
                    "esri/tasks/closestfacility"
            ], function () {

            });

            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxClosestFacilityScale) {
                alert("Closest Feature functionality is available from 1:" + configOptions.maxClosestFacilityScale);
            }
            else {
                changeCursor('closestfeature');
            }
        });

        $("#lblClosestFeature").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxClosestFacilityScale) {
                alert("Closest Feature functionality is available from 1:" + configOptions.maxClosestFacilityScale);
            }
            else {
                changeCursor('closestfeature');
            }
        });

        // When clear button clicked
        $("#btnClearMap").bind("click", function () {
            // CALL FUNCTION - Clear all graphics
            clearAllGraphics();
        });

        $("#lblClearMap").bind("click", function () {
            // CALL FUNCTION - Clear all graphics
            clearAllGraphics();
        });

        $("#btnGoogleStreetView").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxstreetviewscale) {
                alert("Street View functionality is available from 1:" + configOptions.maxstreetviewscale);
            }
            else {
                changeCursor('streetview');
            }
        });

        $("#lblGoogleStreetView").bind("click", function () {
            // Enable if scale is below certain level
            var currentScale = app.map.getScale();
            if (currentScale > configOptions.maxstreetviewscale) {
                alert("Street View functionality is available from 1:" + configOptions.maxstreetviewscale);
            }
            else {
                changeCursor('streetview');
            }
        });

        $("#btnCloseAccordion").bind("click", function () {
            $("#toolsAccordion").css({ display: 'none' });
            changeCursor('identify');
            deactivateMeasureTool();
        });

        $("#btnAddShapeFile").bind("click", function () {
            uploadShapefile();
        });

        $("#lblAddShapeFile").bind("click", function () {
            uploadShapefile();
        });

        $("#btnAddXYdata").bind("click", function () {
            uploadCSVfile();
        });

        $("#lblAddXYdata").bind("click", function () {
            uploadCSVfile();
        });

        $("#btnBookmark").bind("click", function () {
            $('#shareDialog').html('<p>Copy and paste this link and share:</p><textarea style="font-size:0.9em;width:275px;height:90px;">' + getURL() + '</textarea>')
            $('#shareDialog').attr('title', 'Share link');
            $("#shareDialog").dialog();
        });

        $("#btnBookmark").hover(function () {
            $(this).css('cursor', 'pointer');
        });

        $("#btnShareMap").bind("click", function () {
            var URL = 'mailto:?Subject=Shared%20Map%20&body=Click%20this%20link:%20' + (replaceAll(getURL(), '&', '%26'));
            // Open email client with content from above
            window.location.href = URL;
        });

        $("#btnShareMap").hover(function () {
            $(this).css('cursor', 'pointer');
        });


        // When property report button clicked
        $("#btn-propertyreport").bind("click", function () {
            clickmode = 'propertyreport';
            $('#toolsPopup').popup('close');
        });

        // When closest feature button clicked
        $("#btn-closestFeature").bind("click", function () {
            clickmode = 'closestfeature';
            $('#toolsPopup').popup('close');
        });

        // When identify button clicked
        $("#btn-identify").bind("click", function () {
            clickmode = 'identify';
            $('#toolsPopup').popup('close');
        });

        // When clear button clicked
        $("#btn-clear-map").bind("click", function () {
            app.map.graphics.clear();
            $('#toolsPopup').popup('close');
        });
    }

    // Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        $("#btn-share-map").bind("click", function () {
            var emailURL = 'mailto:?Subject=Shared%20Map%20&body=Click%20this%20link:%20' + (replaceAll(getURL(), '&', '%26'));
            var mobileURL = '<a href="' + emailURL + '">Email link</a><br/><br/><font size="1">' + getURL() + '</font>';
            var sPath = window.location.pathname;
            var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
            var shareURL = replaceAll(mobileURL, sPage, 'map.html');

            $("#shareMap").html(shareURL);

        });

        $(document).ready(function () {
            // Show the mobile header
            $("#header").css("display", "block");
        });
    }

    // Embed version
    if (currentPage.indexOf("embed") != -1) {

    }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Theme functionality ---------------------------------------------------------------------------  
function themeLoad() {
    console.log("FUNCTION - themeLoad");
    var searchesArray = [];
    var geocoders = [];
    var extent;

    // Go through themes
    for (var a = 0; configOptions.themes.length > a; a++) {
        // Get the theme details
        // Desktop version
        if (currentPage.indexOf("map") != -1) {
            if (configOptions.themes[a].theme == document.getElementById("selectTheme").value) {
                // Assign the searches to the array
                searchesArray = configOptions.themes[a].searches;
                // Add theme to themes used array
                themesUsed.push(document.getElementById("selectTheme").value);

                // If using AGS Online web map
                if (configOptions.useAGSOnlineWebMap == "true" || configOptions.useAGSOnlineWebMap == true) {
                    loadArcGISOnlineWebMap(configOptions.themes[a].webmapID);
                }
                else {
                    // Assign extent to variable
                    extent = configOptions.themes[a].initialExtent;
                }
            }
        }
        // Embed version
        if (currentPage.indexOf("embed") != -1) {
            if (configOptions.themes[a].theme == initialTheme) {
                // Assign the searches to the array
                searchesArray = configOptions.themes[a].searches;

                // If using AGS Online web map
                if (configOptions.useAGSOnlineWebMap == "true" || configOptions.useAGSOnlineWebMap == true) {
                    loadArcGISOnlineWebMap(configOptions.themes[a].webmapID);
                }
                else {
                    // Assign extent to variable
                    extent = configOptions.themes[a].initialExtent;
                }
            }
        }
        // Mobile version
        if (currentPage.indexOf("mobile") != -1) {
            if (configOptions.themes[a].theme == $('input[name=theme]:checked', '#themes').val()) {
                // Assign the searches to the array
                searchesArray = configOptions.themes[a].searches;
                // Add theme to themes used array
                themesUsed.push($('input[name=theme]:checked', '#themes').val());

                // If using AGS Online web map
                if (configOptions.useAGSOnlineWebMap == "true" || configOptions.useAGSOnlineWebMap == true) {
                    loadArcGISOnlineWebMap(configOptions.themes[a].webmapID);
                }
                else {
                    // Assign extent to variable
                    extent = configOptions.themes[a].initialExtent;
                }
            }
        }
    }

    // If not using AGS Online web map
    if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
        if ((extent.xmin) && (extent.ymin) && (extent.xmax) && (extent.ymax)) {
            // Go to extent if set in themes
            var extentZoom = new esri.geometry.Extent({
                "xmin": extent.xmin,
                "ymin": extent.ymin,
                "xmax": extent.xmax,
                "ymax": extent.ymax,
                "spatialReference": {
                    "wkid": parseInt(configOptions.spatialReference.WKID)
                }
            });
            app.map.setExtent(extentZoom);
        }
    }

    // Get searches to include from searches
    // Go through seaches array
    for (var b = 0; searchesArray.length > b; b++) {
        // Go through searches and add in searches to include into object array
        for (var c = 0; configOptions.searchParams.length > c; c++) {
            if (configOptions.searchParams[c].locatorName == searchesArray[b]) {
                // If geocoding URL provided then add to geocoders array
                if (configOptions.searchParams[c].url) {
                    geocoders.push(configOptions.searchParams[c]);
                }
            }
        }
    }

    // Setup the geocoding search if geocoders added
    if (searchesArray.length > 0) {
        setupGeocodeWidget(geocoders);
    }

    // Minimise themes window
    $("#themesWrapper").accordion("option", "active", false);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Map functionality ---------------------------------------------------------------------------  
function initFunctionality() {
    console.log("FUNCTION - initFunctionality");
    // If the orientation is changed - For mobile devices
    var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    if (app.map) {
        app.map.reposition();
        app.map.resize();
    }

    // CALL FUNCTION - Setup basemap gallery
    createBasemapGallery();

    // CALL FUNCTION - Setup identity manager handler for security
    setupIdentityManager();

    // Desktop version
    if (currentPage.indexOf("map") != -1) {
        // If display layer mode button
        if (configOptions.displayLayerMode == "true" || configOptions.displayLayerMode == true) {
            // When layer change button clicked
            function layerModeChange(layerMode, handler) {
                // Refresh the legend
                if (handler == "click") {
                    // Clear previous widget
                    var legendWidget = dijit.byId("legendTab");
                    if (legendWidget) {
                        legendWidget.destroyRecursive(true);
                    }

                    // If not using AGS Online web map
                    if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
                        // Setup the legend widget
                        legend = new esri.dijit.Legend({
                            map: app.map,
                            autoUpdate: true,
                            respectCurrentMapScale: true
                        }, "legendTab");
                    }
                        // Using AGS Online map
                    else {
                        // Get legend layers from ags map
                        var legendLayers = esri.arcgis.utils.getLegendLayers(agsOnlineMap);

                        // Setup the legend widget
                        legend = new esri.dijit.Legend({
                            map: app.map,
                            layerInfos: legendLayers,
                            autoUpdate: true,
                            respectCurrentMapScale: true
                        }, "legendTab");
                    }
                }

                if (!layerMode) {
                    layerMode = $("input:radio[name='layerMode']:checked").val();
                }
                // Change the layer mode
                if (layerMode == "advanced") {
                    // Hide the maps and layers tab
                    $("#layerTabs").tabs("option", "disabled", [0, 1]);
                    // Show all layers tab
                    $("#layerTabs").tabs('enable', 2);

                    // Refresh tabs
                    $("#layerTabs").tabs("refresh");
                    // Activate first tab
                    $("#layerTabs").tabs({ active: 2 });

                    // CALL FUNCTION - Load all the layers into the layers tab for advanced mode
                    buildAllLayers();
                }
                    // Simple mode
                else {
                    // Show the maps and layers tab
                    $("#layerTabs").tabs('enable', 0);
                    $("#layerTabs").tabs('enable', 1);
                    // Hide all layers tab
                    $("#layerTabs").tabs("option", "disabled", [2]);

                    // Refresh tabs
                    $("#layerTabs").tabs("refresh");
                    // Activate first tab
                    $("#layerTabs").tabs({ active: 0 });

                    // CALL FUNCTION - Load all the layers in the default layer group
                    // If coming from click
                    if (handler == "click") {
                        layerGroupChanged(replaceAll(configOptions.initiallayergroup, ' ', '_'));
                        // Set the radio button
                        $("#layerGroup" + replaceAll(configOptions.initiallayergroup, ' ', '_')).prop("checked", true);
                    }
                }
            }

            // Set the default layer mode
            layerModeChange(configOptions.defaultLayerMode.toLowerCase(), "load");

            var layerModes = '<p><label>Mode: </label>';
            // For each of the layer modes
            $.each(configOptions.layerModes, function () {
                // If default value then make sure it's checked
                if (this.value == configOptions.defaultLayerMode.toLowerCase()) {
                    layerModes += '<input type="radio" checked="checked" name="layerMode" id="' + this.value + '" value="' + this.value + '"/><label for="' + this.value + '">' + this.label + "</label>";
                }
                else {
                    layerModes += '<input type="radio" name="layerMode" id="' + this.value + '" value="' + this.value + '"/><label for="' + this.value + '">' + this.label + "</label>";
                }
            });
            layerModes += '</p>';
            // Load buttons into div
            $("#layerMode").append(layerModes);
            // Set jQuery radio buttons
            $("#layerMode").buttonset();

            // Setup button change handler
            $("input[name='layerMode']").change(function () {
                layerModeChange(null, "click");
            });
        }

        // If not using AGS Online web map
        if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
            // Setup the legend widget
            legend = new esri.dijit.Legend({
                map: app.map,
                autoUpdate: true,
                respectCurrentMapScale: true
            }, "legendTab");
        }
        // Using AGS Online map
        else {
            // Get legend layers from ags map
            var legendLayers = esri.arcgis.utils.getLegendLayers(agsOnlineMap);

            // Delete previous legend widget if necessary
            var legendTab = dijit.byId("legendTab");
            if (legendTab) {
                legendTab.destroyRecursive(true);
            }

            // Setup the legend widget
            legend = new esri.dijit.Legend({
                map: app.map,
                layerInfos: legendLayers,
                autoUpdate: true,
                respectCurrentMapScale: true
            }, "legendTab");
        }

        // Delete previous bookmarks widget if necessary
        $('#bookmarksTool').remove();
        $('#bookmarkTool').append($('<div id="bookmarksTool"></div>'));

        // Create the bookmark widget
        bookmarks = new esri.dijit.Bookmarks({
            map: app.map,
            bookmarks: configOptions.bookmarks_list,
            editable: true
        }, dojo.byId("bookmarksTool"));

        // Setup the navigation bar
        navToolbar = new esri.toolbars.Navigation(app.map);
        // Set the full navigation if desktop version
        if (currentPage.indexOf("map") != -1) {
            // On extent change, update history
            dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
        }

        // Navigation button click handlers
        $('#btnZoomInwards').bind("click", function () {
            changeCursor('zoomin');
        });
        $('#btnZoomOutwards').bind("click", function () {
            changeCursor('zoomout');
        });
        $('#btnPanning').bind("click", function () {
            changeCursor('pan');
        });
        $('#btnZoomPrev').bind("click", function () {
            navToolbar.zoomToPrevExtent();
        });
        $('#btnZoomNext').bind("click", function () {
            navToolbar.zoomToNextExtent();
        });

        // Load draw tool
        if (configOptions.displayDraw === "true" || configOptions.displayDraw === true) {
            // Load the draw tool
            initDrawTool();
        }

        // Load measure tool
        if (configOptions.displayMeasure === "true" || configOptions.displayMeasure === true) {
            // Load the measure tool
            initMeasureTool();
        }

        // Load the print tool
        if (configOptions.displayprint === "true" || configOptions.displayprint === true) {
            // Load the print tool
            initPrint();
        }

        // Load property report tool
        if (configOptions.displaypropertyreport === "true" || configOptions.displaypropertyreport === true) {
            // Load the property report tool
            initPropertyReport();
        }

        // Load reports tool
        if (configOptions.displayReports === "true" || configOptions.displayReports === true) {
            // Load the reports tool
            initReports();
        }

        // Load XY data tool
        if (configOptions.displayaddxy === "true" || configOptions.displayaddxy === true) {
            $("#btnAddXYdata").css('display', 'block');
            $("#lblAddXYdata").css('display', 'block');

            // Load in colours from config
            for (var j = 0; configOptions.csvcolours.length > j; j++) {
                $("#csvColours").append($("<option></option>").attr("value", configOptions.csvcolours[j]).text(configOptions.csvcolours[j]));

                var $option = $("<option></option>").attr("value", configOptions.csvcolours[j]).text(configOptions.csvcolours[j]);
                // set the default colour
                if (configOptions.defaultCSVColour === configOptions.csvcolours[j]) {
                    $option.attr('selected', 'selected');
                }

                $("#csvColours").append($option);
            }

            // Add remove xy handler
            $("#removeCSV").click(function () {
                removeCSV();
            });

            // Drag and drop - HTML5 compatible browsers only.  This is being used for dragging CSV files onto map.
            setupDropZone();
        }

        // Load shapefile tool
        if (configOptions.displayaddshapefile === "true" || configOptions.displayaddshapefile === true) {
            $("#btnAddShapeFile").css('display', 'block');
            $("#lblAddShapeFile").css('display', 'block');

            // Load in colours from config
            for (var j = 0; configOptions.shapefilecolours.length > j; j++) {
                $("#shapefileColours").append($("<option></option>").attr("value", configOptions.shapefilecolours[j]).text(configOptions.shapefilecolours[j]));

                var $option = $("<option></option>").attr("value", configOptions.shapefilecolours[j]).text(configOptions.shapefilecolours[j]);
                // set the default colour
                if (configOptions.defaultShapefileColour === configOptions.shapefilecolours[j]) {
                    $option.attr('selected', 'selected');
                }

                $("#shapefileColours").append($option);
            }

            // Add remove shapefiles handler
            $("#removeShapefiles").click(function () {
                removeShapefile();
            });
        }

        // Display scalebar
        if (configOptions.displayscalebar === "true" || configOptions.displayscalebar === true) {
            // Setup scale bar
            var scalebar = new esri.dijit.Scalebar({
                map: app.map,
                attachTo: "bottom-left",
                scalebarUnit: "metric",
                scalebarStyle: "ruler"
            });
        }
    }

    // Embed version 
    if (currentPage.indexOf("embed") != -1) {
        // Display scalebar - Embed
        if (configOptions.displayscalebar === "true" || configOptions.displayscalebar === true) {
            // Setup scale bar
            var scalebar = new esri.dijit.Scalebar({
                map: app.map,
                attachTo: "bottom-left",
                scalebarUnit: "metric",
                scalebarStyle: "ruler"
            });
        }
    }

    // Mobile version 
    if (currentPage.indexOf("mobile") != -1) {
        // Setup the legend widget
        legend = new esri.dijit.Legend({
            map: app.map,
            autoUpdate: true,
            respectCurrentMapScale: true
        }, "legend");

        // If using themes, display the dropdown
        if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
            // Setup themes and handler when theme changed
            // Display the themes button                     
            $("#btn-theme").css('display', 'block');
            $("#themes").bind("change", function () {
                themeLoad();
                // Close the dialog - Mobile version
                if (currentPage.indexOf("mobile") != -1) {
                    $('#themesPopup').popup('close');
                }
            });
        }

        // Display scalebar
        if (configOptions.displayscalebar === "true" || configOptions.displayscalebar === true) {
            // Setup scale bar
            var scalebar = new esri.dijit.Scalebar({
                map: app.map,
                attachTo: "bottom-right",
                scalebarUnit: "metric",
                scalebarStyle: "ruler"
            });
        }
    }

    // Setup the slider lods
    if (configOptions.setlods == "true" || configOptions.setlods == true) {
        lods = configOptions.lods;
    }
    else {
        lods = app.basemap.tileInfo.lods;
    }

    // If display labels are to be displayed on sldier
    var labels = [];
    if (configOptions.displayzoomsliderlabels == "true" || configOptions.displayzoomsliderlabels == true) {
        for (var i = 0, il = lods.length; i < il; i++) {
            if (lods[i].scale == 500) {
                labels[i] = "Property";
            }
            if (lods[i].scale == 1500) {
                labels[i] = "Street";
            }
            if (lods[i].scale == 10000) {
                labels[i] = "Suburb";
            }
            if (lods[i].scale == 50000) {
                labels[i] = "Town";
            }
            if (lods[i].scale == 250000) {
                labels[i] = "District";
            }
            if (lods[i].scale == 1000000) {
                labels[i] = "Region";
            }
            if (labels[i] == null) {
                labels[i] = "";
            }
        }
        esri.config.defaults.map.sliderLabel = {
            tick: 0,
            labels: labels
        };
    }
    else {
        esri.config.defaults.map.sliderLabel = null;
    }

    // Setup the slider and zoom event handler
    $("#zoomSlider").slider({
        min: 0,
        max: lods.length - 1,
        value: app.map.getLevel(),
        orientation: "vertical",
        range: "min",
        change: function (event, ui) {
            app.map.setLevel(ui.value);
        }
    });

    // On zoom end
    app.map.on("zoom-end", function () {
        // Update slider
        $("#zoomSlider").slider("value", app.map.getLevel());
        // CALL FUNCTION - Update the available layers
        updateEnabledLayers();
    });

    // Populate zoom-to scale dropdown and scale in print tool       
    if (configOptions.displayzoomtoscale === "true" || configOptions.displayzoomtoscale === true) {
        $("#mapInfo").css('display', 'inline');
        $("#scalelevels").empty();
        // Get tile info from the lods if setlods is set to true
        if (configOptions.setlods === true || configOptions.setlods === "true") {
            var scales = configOptions;
        }
        else {
            var scales = app.basemap.tileInfo;
        }
        for (var j = scales.lods.length - 1; j >= 0; j--) {
            $("#scalelevels").append($("<option></option>").attr("value", scales.lods[j].level).text("1:" + parseInt(scales.lods[j].scale)));
        }
        $("#scalezoom").css('display', 'inline');
        $("#scalelevels").val(app.map.getLevel());

        $("#scalelevels").bind("change", function () {
            app.map.setLevel(this.value);
        });

        // Set map print scale
        $("#mapScale").val(app.map.getScale());


        // On zoom end
        app.map.on("zoom-end", function () {
            $("#scalelevels").val(app.map.getLevel());
            // Set map print scale
            $("#mapScale").val(app.map.getScale());
        });
    }

    // Listen to mouse move & drag events - if we want to show coordinates on the map
    if (configOptions.displaycoordinates === "true" || configOptions.displaycoordinates === true) {
        // Show coordinates - Desktop version
        if (currentPage.indexOf("map") != -1) {
            // On mouse move
            app.map.on("mouse-move", showCoordinates);
            app.map.on("mouse-drag", showCoordinates);
        }
    }

    // Set basemap if provided in URL
    if (urlParam_baseMap) {
        basemapGallery.select(urlParam_baseMap);
        // Minimise basemap window - Desktop version
        if (currentPage.indexOf("map") != -1) {
            $("#basemapsWrapper").accordion("option", "active", false);
        }
    }

    // Resize the map if the screen is resized
    app.map.resize();
    app.map.reposition();
    var resizeTimer;

    // If map is resized
    app.map.on("resize", function () {
        // Set to 500 milliseconds so that the map doesn't try to resize while the user is resizing their browser
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            app.map.resize();
            app.map.reposition();
        }, 500);
    });

    // Set the default click/cursor mode
    // Desktop version
    if (currentPage.indexOf("map") != -1) {
        changeCursor(configOptions.clickDefault);
    }
    // Mobile and embed versions
    if ((currentPage.indexOf("mobile") != -1) || (currentPage.indexOf("embed") != -1)) {
        // Mobile and embed will always have identify as default
        clickmode = "identify";
    }

    // If application hasn't loaded yet
    if (initialLoad == false) {
        // CALL FUNCTION - Load UI and event handlers
        loadUI();
        loadeventHandlers();
    }


    // If not using themes
    if (configOptions.usethemes === "false" || configOptions.usethemes === false) {
        // CALL FUNCTION - Setup searches
        setupGeocodeWidget(null);
    }

    // CALL FUNCTION - Setup the layer groups
    buildLayerGroups();

    // Hide the progress bar for loading the app
    $("#appLoadBar").hide();

    // Set initial load of application to true
    initialLoad = true;
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Layers and Search functionality ---------------------------------------------------------------------------  
// Setup the geocoding search widget
function setupGeocodeWidget(geocoders) {
    // Clear previous widget
    var geocodeWidget = dijit.byId("search");
    if (geocodeWidget) {
        geocodeWidget.destroyRecursive(true);
    }

    // Setup the default search
    var defaultSearch = configOptions.searchDefault;
    // If URL search provided, update the search text box with the url search and perform search
    if (urlParam_search) {
        defaultSearch = urlParam_search;
    }

    // If geocoders are provided, themes are enabled
    var Geocoder;
    if (geocoders) {
        // Setup the geocoder widget
        Geocoder = new esri.dijit.Geocoder({
            arcgisGeocoder: false,
            autoComplete: true,
            showResults: true,
            autoNavigate: false,
            geocoderMenu: true,
            searchDelay: 10,
            geocoders: geocoders,
            maxLocations: 5,
            minCharacters: 3,
            value: defaultSearch,
            map: app.map
        }, dojo.byId("search"));
        Geocoder.startup();
        Geocoder.show();
    }
    else {
        // Otherwise get geocoders from config
        var configGeocoders = [];
        // Go through seaches array
        var count = 0;
        $.each(configOptions.searchParams, function () {
            // If geocoding URL provided then add to geocoders array
            if (this.url) {
                configGeocoders.push(configOptions.searchParams[count]);
            }
            count++;
        });

        // Setup the geocoder widget
        Geocoder = new esri.dijit.Geocoder({
            arcgisGeocoder: false,
            autoComplete: true,
            showResults: true,
            autoNavigate: false,
            geocoderMenu: true,
            searchDelay: 10,
            geocoders: configGeocoders,
            maxLocations: 5,
            minCharacters: 3,
            value: defaultSearch,
            map: app.map
        }, dojo.byId("search"));
        Geocoder.startup();
        Geocoder.show();
    }

    // When results are returned from auto complete query
    dojo.connect(Geocoder, "onAutoComplete", function (result) {
        console.log("Autocomplete results returned");
    });

    // When results are returned from the geocode text search
    dojo.connect(Geocoder, "onFindResults", function (result) {
        var selectedLocator = Geocoder.activeGeocoder.name;
        onSearch(result, selectedLocator, "textSearch");
    });

    // When result is selected from autocomplete dropdown
    dojo.connect(Geocoder, "onSelect", function (result) {
        var selectedLocator = Geocoder.activeGeocoder.name;
        onSearch(result, selectedLocator, "autocompleteSearch");
    });

    // If URL search provided, perform search
    if (urlParam_search) {
        Geocoder.find();
    }
}

// Build the layer groups for the maps tab
function buildLayerGroups() {
    // Remove all operational layers
    removeOperationalLayers();
    // Clear layers tab - Desktop
    if (currentPage.indexOf("map") != -1) {
        $('#layersTab').html("");
    }
    // Clear layers tab - Mobile
    if (currentPage.indexOf("mobile") != -1) {
        $('#layers').html("");
    }

    // Disconnect previous layer add handler
    dojo.disconnect(layerAddedHandler);

    var layergroups;
    var initiallayergroup;
    // If using themes, then display only certain layers for the theme selected
    if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
        // Get the layer groups to use from config
        for (var a = 0; configOptions.themes.length > a; a++) {
            // Get the theme
            // Desktop version
            if (currentPage.indexOf("map") != -1) {
                if (configOptions.themes[a].theme == document.getElementById("selectTheme").value) {
                    // Assign layer groups and initial layer
                    layergroups = configOptions.themes[a].layergroups;
                    initiallayergroup = configOptions.themes[a].initiallayergroup;
                }
            }
            // Embed version
            if (currentPage.indexOf("embed") != -1) {
                if (configOptions.themes[a].theme == initialTheme) {
                    // Assign layer groups and initial layer
                    layergroups = configOptions.themes[a].layergroups;
                    initiallayergroup = configOptions.themes[a].initiallayergroup;
                }
            }
                // Mobile version
            else {
                if (configOptions.themes[a].theme == $('input[name=theme]:checked', '#themes').val()) {
                    // Assign layer groups and initial layer
                    layergroups = configOptions.themes[a].layergroups;
                    initiallayergroup = configOptions.themes[a].initiallayergroup;
                }
            }
        }
    }
        // Else use layer groups config
    else {
        // Assign layer groups and initial layer
        layergroups = configOptions.layergroups;
        initiallayergroup = configOptions.initiallayergroup;
    }

    // Check if layer group is in URL
    var layergroupInURL = false;
    $.each(configOptions.layergroups, function () {
        if (urlParam_layerGroup == replaceAll(this.name, '_', ' ')) {
            layergroupInURL = true;
        }
    });

    var opLayers = [];
    var TOChtml = "";
    var checked = "";
    var id = "";

    // Setup layer groups - Desktop version
    if (currentPage.indexOf("map") != -1) {
        TOChtml += '<span style="font-size:1em;">';
        // For each of the layer groupings
        $.each(layergroups, function () {
            // If layer group is specified in URL
            if (urlParam_layerGroup && replaceAll(this.name, '_', ' ') == urlParam_layerGroup) {
                checked = ' checked="true" ';
                // Add layer group to layer groups used array
                layerGroupsUsed.push(this.name);
            }
                // If layer group not in URL then use config
            else if ((this.name == initiallayergroup) && (layergroupInURL == false)) {
                checked = ' checked="true" ';
                // Add layer group to layer groups used array
                layerGroupsUsed.push(this.name);
            }
            else {
                checked = "";
            }
            // Set the id of the radio button
            var id = ' id="layerGroup' + replaceAll(this.name, ' ', '_') + '" ';
            // Add in the layer group radio button
            TOChtml += '<fieldset><span style="margin-left:-5px;font-size:0.9em;"><input type="radio" name="tocgroup" ' + id + checked + ' value="' + replaceAll(this.name, ' ', '_') + '"/><B>' + this.name + '</B></span><br/>' + this.description + '</fieldset>';
        });
        TOChtml += '</span>';

        // Assign layer groups html to maps tab
        $('#mapsTab').html(TOChtml);
    }

    // Setup layer groups - Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        TOChtml += '<fieldset data-role="controlgroup" data-type="vertical"><legend><B>Layer Group:</B></legend>';
        $.each(layergroups, function () {
            // If layer group is specified in URL
            if (urlParam_layerGroup && replaceAll(this.name, '_', ' ') == urlParam_layerGroup) {
                checked = ' checked="true" ';
                // Add layer group to layer groups used array
                layerGroupsUsed.push(this.name);
            }
                // If layer group not in URL then use config
            else if ((this.name == initiallayergroup) && (layergroupInURL == false)) {
                checked = ' checked="true" ';
                // Add layer group to layer groups used array
                layerGroupsUsed.push(this.name);
            }
            else {
                checked = "";
            }
            // Set the id of the radio button
            var id = ' id="layerGroup' + replaceAll(this.name, ' ', '_') + '"';
            // Add in the layer group radio button
            TOChtml += '<input type="radio" name="tocgroup"' + id + checked + ' value="' + replaceAll(this.name, ' ', '_') + '"/><label for="layerGroup' + replaceAll(this.name, ' ', '_') + '">' + this.name + '</label>';
        });

        TOChtml += '</fieldset>';
        // Assign to mobile layers window
        $('#layerGroups').html(TOChtml);
        // Initialise jQuery on div
        $("#layerGroups").trigger('create');
    }

    // If nothing is checked then use initial layer group from config e.g. URL layer group not checking any layers
    var currentCheckedValue = $("input:radio[name='tocgroup']:checked").val();
    // Desktop version
    if (currentPage.indexOf("map") != -1) {
        if (!currentCheckedValue) {
            // Get the initial layer group from the config or URL
            // If using themes
            if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
                for (var b = 0; configOptions.themes.length > b; b++) {
                    // Get the theme
                    if (configOptions.themes[b].theme == document.getElementById("selectTheme").value) {
                        // Get initial layer and check it
                        var initiallayergroup = configOptions.themes[b].initiallayergroup;
                        document.getElementById("layerGroup" + initiallayergroup).checked = true;
                    }
                }
            }
            else {
                var initiallayergroup = configOptions.initiallayergroup;
                document.getElementById("layerGroup" + initiallayergroup).checked = true;
            }
        }
    }

    opLayers = [];

    // Add layers to array for layer grouping
    $.each(operationalLayers, function () {
        // Layer group in URL
        if (layergroupInURL == true) {
            if (urlParam_layerGroup == replaceAll(this.layerGroup, '_', ' ')) {
                opLayers.push(getLayerInformation(this));
            }
        }
            // Layer group in config
        else {
            if (initiallayergroup == this.layerGroup) {
                opLayers.push(getLayerInformation(this));
            }
        }
    });

    // For each of the operational layers, check it has loaded before adding it to the layer list
    for (var c = 0; opLayers.length > c; c++) {
        var layer = opLayers[c];
        // Add listener for when layer is loaded - Add layer to layer list
        dojo.connect(layer, "onLoad", function (layer) {
            // CALL FUNCTION - Build the layer list
            buildLayerList(layer, "Simple");
        });
    }

    // When a layer is added to the map
    layerAddedHandler = dojo.connect(app.map, 'onLayerAddResult', function (layer) {
        layerAdded($.trim($("input:radio[name='tocgroup']:checked").val()), layer);
    });


    // When the layer group is changed
    $("input:radio[name=tocgroup]").change(function () {
        layerGroupChanged($(this).val());
    });
}

// When the layer group is changed
function layerGroupChanged(layerGroupSelected) {
    // Close the dialog - Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        $('#layerGroupsPopup').popup('close');
    }

    // Add layer group to layer groups used array     
    layerGroupsUsed.push(layerGroupSelected);

    // Remove all operational layers
    removeOperationalLayers();
    // Clear layers tabs - Desktop
    if (currentPage.indexOf("map") != -1) {
        $('#layersTab').html("");
        $('#layersTabAll').html("");
    }
    // Clear layers tab - Mobile
    if (currentPage.indexOf("mobile") != -1) {
        $('#layers').html("");
    }

    // Get the selected group and trim whitespace at end
    var selectedgroup = $.trim(layerGroupSelected);
    var opLayers = [];

    var basemapSelected = basemapGallery.getSelected();
    if (basemapSelected !== null) {
        if (basemapSelected.title.indexOf("Imagery") !== -1) {
            addImageryLayers();
        }
    }

    // For each of the operational layers
    $.each(operationalLayers, function () {
        // If the layer is in the selected group
        if (replaceAll(this.layerGroup, ' ', '_') == selectedgroup) {
            if (!app.map.getLayer(this.id)) {
                // Add layers to array for layer grouping
                opLayers.push(getLayerInformation(this));
            }
        }
    });

    // For each of the operational layers, check it has loaded before adding it to the layer list
    for (var a = 0; opLayers.length > a; a++) {
        var layer = opLayers[a];

        // Add listener for when layer is loaded - Add layer to layer list
        dojo.connect(layer, "onLoad", function (layer) {
            // CALL FUNCTION - Build the layer list
            buildLayerList(layer, "Simple");
        });
    }
}

// Build all layers for the advanced layer mode
function buildAllLayers() {
    var opLayers = [];
    // For each of the operational layers
    $.each(operationalLayers, function () {
        if (!app.map.getLayer(this.id)) {
            // Add layers to array , but not secure ones
            if (this.secure !== "true" && this.secure !== true) {
                // If layer name hasn't already been added
                var layerAlreadyAdded = false;
                for (var a = 0; opLayers.length > a; a++) {
                    if (opLayers[a].name == this.name) {
                        var layerAlreadyAdded = true;
                    }
                }
                // Push layer info into an array if not already added
                if (layerAlreadyAdded == false) {
                    var layerInfo = new Array();
                    layerInfo["layer"] = getLayerInformation(this);
                    layerInfo["name"] = this.name;
                    opLayers.push(layerInfo);
                }
            }
        }
    });
    // For each of the operational layers, check it has loaded before adding it to the layer list
    for (var a = 0; opLayers.length > a; a++) {
        var layer = opLayers[a].layer;

        // Add listener for when layer is loaded - Add layer to layer list
        dojo.connect(layer, "onLoad", function (layer) {
            // CALL FUNCTION - Build the layer list
            buildLayerList(layer, "Advanced");
        });
    }
}

// Build the individual layers for the layers tab and add them to the map
function buildLayerList(layer, layerMode) {
    // Setup sub layers (layers within map service)
    var subLayers = layer.layerInfos;
    var subLayer;
    var checked = "";
    var layerType;
    var layerName;
    var layerOpacity;
    var layersTab;

    // Set tab to be updated depending on layer mode
    if (layerMode === "Simple") {
        layersTab = "#layersTab";
    }
    else {
        layersTab = "#layersTabAll";
    }
    // Setup individual layers - Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        layersTab = "#layers";
    }

    // Get the operational layers for this map
    // If not using AGS Online web map
    if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {

    }
    // Using AGS Online map
    else {

    }


    // Get layer visiblity and name from config
    $.each(operationalLayers, function () {
        // Get the layer details by id
        if (this.id == layer.id) {
            // Set dynamic layer boolean
            layerType = this.layerType;
            // Set layer name
            layerName = this.name;
            // Set layer opacity
            layerOpacity = this.opacity;
            // Get default layer visiblity
            if (this.visible == true) {
                checked = ' checked="true" ';
                layer.setVisibility(true);
            }
            else {
                checked = "";
                layer.setVisibility(false);
            }
        }
    });

    // Add layer (map service) to layers tab array
    // Add html to layers tab
    $(layersTab).append("<input type='checkbox' class='layers'" + checked + "' id='layer" + layer.id + "' title='" + layer.id + " ' onclick='updateLayerVisibility(this);' /><B><font size=\"2\">" + layerName + "</font></B>");

    // Setup the opacity slider and event handler - Desktop version
    if (currentPage.indexOf("map") != -1) {
        $(layersTab).append("<br\><I>Opacity</I><br/>");

        var slider = $('<div style="width:50%;" id="layerSlider' + layer.id + '"></div>');
        $(slider).slider({
            min: 0,
            max: 100,
            value: layerOpacity * 100,
            range: "min",
            // Opacity change handler
            change: function (event, ui) {
                // Change the opacity of the layer to the specified value
                var layer = app.map.getLayer(replaceAll(this.id, 'layerSlider', ''));
                layer.setOpacity(ui.value / 100);
            }
        });
        // Add html to layers tab
        $(layersTab).append(slider);
    }

    // If layer id dynamic then add in subLayers. For tiled, don't
    if (layerType == "esri.layers.ArcGISDynamicMapServiceLayer") {
        // Indent the sub layers
        // Add gtml to layers tab
        $(layersTab).append("<dl>");
        // For each sub layer within this layer
        for (var i = 0; i < subLayers.length; i++) {
            subLayer = subLayers[i];
            // If the sub layer is set as visible then make that layer visible
            if (subLayer.defaultVisibility) {
                visible.push(subLayer.id);
            }
            // Add to sub layers to layers tab array
            // Add html to layers tab
            if (subLayer.defaultVisibility == true) {
                checked = ' checked="true" ';
            }
            else {
                checked = "";
            }

            $(layersTab).append("<dd><input type='checkbox' class='mapserviceLayers'" + checked + "id='subLayer" + layer.id + subLayer.id + "' title='" + subLayer.name + "' name='" + layer.id + "' value='" + subLayer.id + "' onclick='updateIndividualLayerVisibility(this);' />" + subLayer.name + "</dd><br\>");
        }
        // Add html to layers tab
        $(layersTab).append("</dl>");
    }

    // Add layer to map
    console.log("Adding operational layer to map - " + layer.id);
    app.map.addLayer(layer);

    // Setup the loading progress bar
    $("#layerLoadBar").progressbar({
        value: false
    });

    // Add handlers for when layer starts loading and ends loading
    dojo.connect(layer, "onUpdateStart", function () {
        // Show the progress bar while layers are loading
        $("#layerLoadBar").show();
    });

    dojo.connect(layer, "onUpdateEnd", function () {
        // hide the progress bar after layers have finished loading
        $("#layerLoadBar").hide();
    });

    // Update the available layers
    updateEnabledLayers();
}

// When layers checked on/off
function updateLayerVisibility(layerClicked) {
    // Get the layer clicked
    var layer = app.map.getLayer(replaceAll(layerClicked.id, 'layer', ''));

    // If checkbox is checked, show layer
    if ($('#' + layerClicked.id).prop('checked') == true) {
        layer.show();
    }
        // If checkbox is unchecked, hide layer
    else {
        layer.hide();
    }
}

// When individual layers are checked on/off
function updateIndividualLayerVisibility(layerClicked) {
    // Get the layer clicked
    var layer = app.map.getLayer(layerClicked.name);
    var checkboxes = dojo.query(".mapserviceLayers");
    var visibleLayers = [];
    // For all the checkboxes
    for (var a = 0; a < checkboxes.length; a++) {
        // If checkbox is in clicked layer 
        if (layerClicked.name == checkboxes[a].name) {
            // If checkbox checked, push into array
            if (checkboxes[a].checked) {
                visibleLayers.push(checkboxes[a].value);
            }
        }
    }

    // If there aren't any layers visible set the array to be -1
    if (visibleLayers.length === 0) {
        visibleLayers.push(-1);
    }

    // Set visible layers
    console.log("Set layer visiblity for " + layer.id + " - Layer IDs:" + visibleLayers.join());
    layer.setVisibleLayers(visibleLayers);
}

// When scale changes, update available layers
function updateEnabledLayers() {
    // Get the layer mode
    var layerMode = $("input:radio[name='layerMode']:checked").val();
    // If layer mode is provided and equals advanced
    if ((layerMode) && (layerMode === "advanced")) {
        // For each of the operational layers
        $.each(operationalLayers, function () {
            // Not secure layers
            if (this.secure !== "true" && this.secure !== true) {
                // Get sub layers (layers within map service)
                var layer = getLayerInformation(this);
                var subLayers = layer.layerInfos;

                var subLayersDisabled = 0;
                // For each sub layer within this layer
                for (var i = 0; i < subLayers.length; i++) {
                    var subLayer = subLayers[i];

                    // Update sub layer check box based on max and min scale
                    var layerID = subLayer.id;
                    var currentScale = app.map.getScale();
                    var layermaxScale = subLayer.maxScale;
                    var layerminScale = subLayer.minScale;

                    // Enable/disable check boxes based on visible at current scale - Desktop version
                    if (currentPage.indexOf("map") != -1) {
                        // If layer is dynamic
                        if (!layer.tileInfo) {
                            var sublayerCheckbox = document.getElementById("subLayer" + layer.id + subLayer.id);
                            // If current scale is within max and min of layer, enable checkbox
                            if ((currentScale > layerminScale) || (currentScale < layermaxScale)) {
                                sublayerCheckbox.disabled = true;
                                // Update tooltip
                                sublayerCheckbox.title = subLayer.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                subLayersDisabled++;
                            }
                            else {
                                // Update tooltip
                                sublayerCheckbox.title = subLayer.name;
                                sublayerCheckbox.disabled = false;
                            }

                            // If all sub layer check boxes are disabled then disable the parent layer checkbox too
                            var layerCheckbox = document.getElementById("layer" + layer.id);
                            if (subLayers.length == subLayersDisabled) {
                                // Update tooltip
                                layerCheckbox.title = this.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                layerCheckbox.disabled = true;
                            }
                            else {
                                // Update tooltip
                                layerCheckbox.title = this.name;
                                layerCheckbox.disabled = false;
                            }
                        }
                            // layer is tiled
                        else {
                            var layerCheckbox = document.getElementById("layer" + layer.id);
                            // If current scale is within max and min of layer, enable checkbox
                            if ((currentScale > layerminScale) || (currentScale < layermaxScale)) {
                                // Update tooltip
                                layerCheckbox.title = this.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                layerCheckbox.disabled = true;
                            }
                            else {
                                // Update tooltip
                                layerCheckbox.title = this.name;
                                layerCheckbox.disabled = false;
                            }
                        }
                    }
                }
            }
        });
    }
    else {
        // Get the layer group selected
        var selectedlayerGroup = $("input:radio[name='tocgroup']:checked").val();
        // For each of the operational layers
        $.each(operationalLayers, function () {
            // If the layer is in the selected group       
            if (selectedlayerGroup == replaceAll(this.layerGroup, ' ', '_')) {
                // Get sub layers (layers within map service)
                var layer = getLayerInformation(this);
                var subLayers = layer.layerInfos;

                var subLayersDisabled = 0;
                // For each sub layer within this layer
                for (var i = 0; i < subLayers.length; i++) {
                    var subLayer = subLayers[i];

                    // Update sub layer check box based on max and min scale
                    var layerID = subLayer.id;
                    var currentScale = app.map.getScale();
                    var layermaxScale = subLayer.maxScale;
                    var layerminScale = subLayer.minScale;

                    // Enable/disable check boxes based on visible at current scale - Desktop version
                    if (currentPage.indexOf("map") != -1) {
                        // If layer is dynamic
                        if (!layer.tileInfo) {
                            var sublayerCheckbox = document.getElementById("subLayer" + layer.id + subLayer.id);
                            // If current scale is within max and min of layer, enable checkbox
                            if ((currentScale > layerminScale) || (currentScale < layermaxScale)) {
                                sublayerCheckbox.disabled = true;
                                // Update tooltip
                                sublayerCheckbox.title = subLayer.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                subLayersDisabled++;
                            }
                            else {
                                // Update tooltip
                                sublayerCheckbox.title = subLayer.name;
                                sublayerCheckbox.disabled = false;
                            }

                            // If all sub layer check boxes are disabled then disable the parent layer checkbox too
                            var layerCheckbox = document.getElementById("layer" + layer.id);
                            if (subLayers.length == subLayersDisabled) {
                                // Update tooltip
                                layerCheckbox.title = this.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                layerCheckbox.disabled = true;
                            }
                            else {
                                // Update tooltip
                                layerCheckbox.title = this.name;
                                layerCheckbox.disabled = false;
                            }
                        }
                            // layer is tiled
                        else {
                            var layerCheckbox = document.getElementById("layer" + layer.id);
                            // If current scale is within max and min of layer, enable checkbox
                            if ((currentScale > layerminScale) || (currentScale < layermaxScale)) {
                                // Update tooltip
                                layerCheckbox.title = this.name + " is available below 1:" + layerminScale + " and above 1:" + layermaxScale;
                                layerCheckbox.disabled = true;
                            }
                            else {
                                // Update tooltip
                                layerCheckbox.title = this.name;
                                layerCheckbox.disabled = false;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Get the layer details
function getLayerInformation(operationalLayer) {
    console.log("Get operational layer details from config and create layer (" + operationalLayer.id + " - " + operationalLayer.layerType + ": " + operationalLayer.visible + ", " + operationalLayer.opacity + ", " + operationalLayer.layerList + ", " + operationalLayer.legend + ")");

    var layer = app.map.getLayer(operationalLayer.id);

    if (layer) {
        console.log("Layer Already exists");
    } else {
        console.log("Layer Doesn't exist - creating");
        switch (operationalLayer.layerType) {
            case "esri.layers.ArcGISDynamicMapServiceLayer":
                layer = new esri.layers.ArcGISDynamicMapServiceLayer(operationalLayer.url, { "id": operationalLayer.id, "name": operationalLayer.name, "visible": operationalLayer.visible, "opacity": operationalLayer.opacity, "layerList": operationalLayer.layerList, "legend": operationalLayer.legend });
                break;
            case "esri.layers.ArcGISTiledMapServiceLayer":
                layer = new esri.layers.ArcGISTiledMapServiceLayer(operationalLayer.url, { "id": operationalLayer.id, "name": operationalLayer.name, "visible": operationalLayer.visible, "opacity": operationalLayer.opacity, "layerList": operationalLayer.layerList, "legend": operationalLayer.legend });
                break;
            default:
                console.error("Unexpected layerType: " + operationalLayer.layerType);
                break;
        }
    }
    return layer;
}

// When layer added to map - Refresh legend
function layerAdded(selectedlayerGroup, layer) {
    // Get the number of operational layers for this group that need to be added
    var OperationalLayersToAdd = 0;
    $.each(operationalLayers, function () {
        // If the layer is in the selected group
        if (replaceAll(this.layerGroup, ' ', '_') == selectedlayerGroup) {
            // Add to operational layers
            OperationalLayersToAdd++;
        }
    });

    // If the layer added is an operational layer then add to count - Not extra cache layer or basemap
    if (layer.id.indexOf("layer") === -1 && layer.id != "cacheLayer" && layer.id != "cacheLayer2") {
        layersAdded++;
    }

    // If all layers have been added
    if (OperationalLayersToAdd == layersAdded) {
        console.log("All layers added for layer group - " + selectedlayerGroup + ", new legend generated");
        // Reset counter
        layersAdded = 0;

        var legendLayers = [];
        // For each of the operational layers
        $.each(operationalLayers, function () {
            // Get the layer mode
            var layerMode = $("input:radio[name='layerMode']:checked").val();
            // If layer mode is provided and equals advanced
            if ((layerMode) && (layerMode === "advanced")) {
                // If the layer legend is equal to true           
                if (this.legend === "true" || this.legend === true) {
                    // Add to array to be added into legend
                    var legendLayer = {
                        layer: app.map.getLayer(this.id),
                        title: this.id
                    };
                    legendLayers.push(legendLayer);
                }
            }
            else {
                // If the layer is in the selected group and legend is equal to true           
                if ((selectedlayerGroup == replaceAll(this.layerGroup, ' ', '_')) && ((this.legend === "true" || this.legend === true))) {
                    // Add to array to be added into legend
                    var legendLayer = {
                        layer: app.map.getLayer(this.id),
                        title: this.id
                    };
                    legendLayers.push(legendLayer);
                }
            }
        });
        // Refresh the legend
        legend.refresh(legendLayers);
    }
}

// Create the basemaps
function createBasemapGallery() {
    var basemaps = [];
    var TOChtml = "";
    var checked = "";
    var id = "";
    var basemapCount = 0;

    // If not using AGS Online basemaps
    if (configOptions.useAGSOnlineBasemaps == "false" || configOptions.useAGSOnlineBasemaps == false) {
        $.each(configOptions.basemaps, function () {
            basemaps.push(this.basemap);
        });

        // Setup basemaps gallery
        basemapGallery = new esri.dijit.BasemapGallery({
            showArcGISBasemaps: false,
            basemaps: basemaps,
            bingMapsKey: configOptions.bingmapskey,  // if using Bing Maps
            map: app.map
        }, "basemapGallery");
    }
    // Using AGS Online basemaps
    else {
        // If application hasn't loaded yet
        if (initialLoad == false) {
            // Setup basemap gallery
            basemapGallery = new esri.dijit.BasemapGallery({
                showArcGISBasemaps: false,
                basemapsGroup: configOptions.basemapsGroup,
                portalUrl: configOptions.PortalUrl,
                map: app.map
            }, "basemapGallery");
        }
        else {
            // Update map
            basemapGallery.map = app.map;
        }

    }

    basemapGallery.startup();

    // Setup basemaps - Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        TOChtml += '<fieldset data-role="controlgroup" data-type="vertical"><legend><B>Basemap:</B></legend>';
        $.each(configOptions.basemaps, function () {
            // If inital basemap then check it
            if (this.basemap.id == configOptions.initialbasemap) {
                checked = ' checked="true" ';
            }
            else {
                checked = "";
            }

            // Add in the layer group radio button
            TOChtml += '<input type="radio" name="basemap" ' + 'id="' + this.basemap.id + '"' + checked + 'value="' + this.basemap.id + '" /><label for="' + this.basemap.id + '">' + this.basemap.title + '</label>';
            basemapCount++;
        });

        TOChtml += '</fieldset>';

        // Assign to mobile layers window
        $('#basemaps').html(TOChtml);
        // Initialise jQuery on div
        $("#basemaps").trigger('create');
    }

    // Set the basemap opacity slider - Desktop version
    if (currentPage.indexOf("map") != -1) {
        // Set the basemap opacity if getting from url, otherwise it will just be 100
        if (urlParam_basemapOpacity >= 0 && urlParam_basemapOpacity <= 100) {
            basemapOpacity = urlParam_basemapOpacity;
        }
        else {
            basemapOpacity = 100;
        }

        // setup the basemap opacity slider
        $("#basemapSlider").slider({
            min: 0,
            max: 100,
            value: basemapOpacity,
            orientation: "horizontal",
            range: "min",
            change: function (event, ui) {
                changeOpacity(ui.value);
                basemapSlider.value = ui.value;
                basemapOpacity = ui.value;
            }
        });
    }

    // When basemap gallery has loaded 
    basemapGallery.on("load", function () {
        // Listener for when basemap changed in basemap gallery - Desktop version
        if (currentPage.indexOf("map") != -1) {
            // When basemap is changed
            basemapGallery.on("selection-change", function () {
                // Set opacity of basemap to slider value
                app.map.getLayer(app.map.layerIds[0]).setOpacity($("#basemapSlider").slider("value") / 100);
                // If basemap is imagery, turn on imagery group otherwise hide layers
                var basemapSelected = basemapGallery.getSelected();

                if (basemapSelected.title.indexOf("Imagery") !== -1) {
                    addImageryLayers();
                }
                else {
                    removeImageryLayers();
                }
                // Minimise basemap window
                $("#basemapsWrapper").accordion("option", "active", false);
            });
        }
        // Listener for when basemap changed in basemap gallery - Mobile version
        if (currentPage.indexOf("mobile") != -1) {
            // When basemap is changed
            $("input:radio[name=basemap]").change(function () {
                // Close the dialog
                if (currentPage.indexOf("mobile") != -1) {
                    $('#layerGroupsPopup').popup('close');
                }

                // Get the basemap checked
                var basemapSelected = $("input:radio[name='basemap']:checked").val()
                basemapGallery.select(basemapSelected);

                // If basemap is imagery, turn on imagery theme otherwise hide layers
                var basemapSelected = basemapGallery.getSelected();
                if (basemapSelected.title.indexOf("Imagery") !== -1) {
                    addImageryLayers();
                }
                else {
                    removeImageryLayers();
                }
            });
        }

        // If not using AGS Online web map
        if (configOptions.useAGSOnlineWebMap == "false" || configOptions.useAGSOnlineWebMap == false) {
            // Set the initial basemap from config and select it
            basemapGallery.select(configOptions.initialbasemap);
        }
        // Using AGS Online map
        else {
            // Set the initial basemap
            // For each of the basemaps in the group
            $.each(basemapGallery.basemaps, function () {
                // If the current basemap is in the group
                webmapBasemap = agsOnlineMap.itemInfo.itemData.baseMap.title;
                basemapGalleryMap = this.title;
                if (basemapGalleryMap.indexOf(webmapBasemap) != -1) {
                    // Set the initial basemap
                    basemapGallery.select(this.id);
                }
            });
        }
    });
};

// Remove all operational layers
function removeOperationalLayers() {
    console.log("Removing all operational layers");
    // For each of the operational layers
    $.each(operationalLayers, function () {
        var layer = app.map.getLayer(this.id);
        if (layer) {
            app.map.removeLayer(layer);
        }

    });
}

// Function for when basemap loads, turn on dynamic layers over top of imagery
function addImageryLayers() {
    var opLayers = [];
    var selectedgroup = "Imagery";

    // For each of the operational layers in the config
    $.each(configOptions.operationalLayers, function () {
        // If there are layers specified as imagery
        if (replaceAll(this.layerGroup, ' ', '_') == selectedgroup) {
            opLayers.push(getLayerInformation(this));
        }
    });

    // For each of the imagery layers
    $.each(opLayers, function () {
        var layer = app.map.getLayer(this.id);
        // If layers are already added, make visible, otherwise add to map
        if (layer) {
            layer.show();
        } else {
            app.map.addLayer(this);
        }
    });
}

// Function for when basemap loads, turn off dynamic layers over top of imagery
function removeImageryLayers() {
    var opLayers = [];
    var selectedgroup = "Imagery";

    // For each of the operational layers in the config
    $.each(configOptions.operationalLayers, function () {
        // If there are layers specified as imagery
        if (replaceAll(this.layerGroup, ' ', '_') == selectedgroup) {
            opLayers.push(getLayerInformation(this));
        }
    });

    // For each of the imagery layers
    $.each(opLayers, function () {
        // Hide the layers if available
        var layer = app.map.getLayer(this.id);
        if (layer) {
            layer.hide();
        }
    });
}

// Change the opacity of the layer
function changeOpacity(op) {
    var newOp = (op / 100);
    app.map.getLayer(app.map.layerIds[0]).setOpacity(newOp);
}

// Change ArcGIS Online web map
function loadArcGISOnlineWebMap(webmapID) {
    // Show the progress bar
    $("#appLoadBar").show();

    // Clear the previous map
    $('#map').remove();
    $('#mainWindow').append($('<div id="map"></div>'));

    // Setup popups - Desktop and embed version
    if ((currentPage.indexOf("map") != -1) || (currentPage.indexOf("embed") != -1)) {
        // Clear previous popup
        $('#popup').remove();
        $('#mainWindow').append($('<div id="popup"></div>'));

        // Setup popup and make draggable
        $("#popup").resizable({
            minHeight: configOptions.infowWindowSize[0],
            minWidth: configOptions.infowWindowSize[1],
            maxHeight: 600,
            maxWidth: 600,
            resize: function () {

            }
        });
        $('#popup').draggable({ handle: '#identifyTabs, #directionsContent' });

        popup = new esri.dijit.Popup(null, "popup");

        // Don't display the maximise button
        dojo.connect(popup, "onShow", function (evt) {
            dojo.query(".maximize").addClass('displaynone');
        });
    }

    esri.arcgis.utils.createMap(webmapID, "map",
    {
        mapOptions: {
            wrapAround180: configOptions.wraparound180,
            infoWindow: popup,
            slider: includeSlider,
            sliderStyle: sliderSize,
            navigationMode: "css-transforms",
            fadeOnZoom: true,
            logo: false,
            showAttribution: false
        },
        ignorePopups: false,
        geometryServiceURL: configOptions.geometryserviceurl
    }
    // When ArcGIS Online map has been received
    ).then(function (response) {
        // Get the map
        app.map = response.map;

        // Set the theme for the popups
        dojo.addClass(app.map.infoWindow.domNode, "customTheme");

        // Add listener for when map is clicked
        app.map.on("click", mapClick);

        agsOnlineMap = response;

        // Set the operational layers
        operationalLayers = [];

        // For each layer
        $.each(response.itemInfo.itemData.operationalLayers, function () {
            if (!this.featureCollection) {
                // Get layer ID
                layerID = this.id;
                layerGroup = "";

                // Get the layer type
                layerType = "esri.layers.ArcGISDynamicMapServiceLayer";
                if (this.resourceInfo.singleFusedMapCache == true) {
                    layerType = "esri.layers.ArcGISTiledMapServiceLayer";
                }

                // Look at the config to set layer group and name
                $.each(configOptions.operationalLayers, function () {
                    // Get layer ID
                    configID = this.id;

                    // If ID from configuration matches the current layer ID
                    if (layerID.indexOf(configID) != -1) {
                        // Set layer group
                        layerGroup = this.layerGroup;

                        // Get config info
                        layerList = this.layerList;
                        legend = this.legend;
                        printLegend = this.printLegend;
                        secure = this.secure;
                    }
                });
                
                // Push layer information into array
                operationalLayers.push({ layerGroup: layerGroup, id: this.id, name: this.title, visible: this.visibility, opacity: this.opacity, layerList: layerList, legend: legend, printLegend: printLegend, secure: secure, layerType: layerType, url: this.url });
            }
        });

        // CALL FUNCTION - Setup UI functionality
        initFunctionality();

        // Set the initial basemap
        // For each of the basemaps in the group
        $.each(basemapGallery.basemaps, function () {
            // If the current basemap is in the group
            webmapBasemap = agsOnlineMap.itemInfo.itemData.baseMap.title;
            basemapGalleryMap = this.title;
            if (basemapGalleryMap.indexOf(webmapBasemap) != -1) {
                // Set the initial basemap
                basemapGallery.select(this.id);
            }
        });
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Other general functions ---------------------------------------------------------------------------  
// Get the URL for the share map tools
function getURL() {
    var selectedBasemap = "";
    var selectedBasemapStr = "";
    var queryString = "";

    // Get the basemap selected
    if (basemapGallery.getSelected() != null) {
        selectedBasemap = basemapGallery.getSelected();
        selectedBasemapStr = selectedBasemap.id;
    }

    queryString = "http://" + window.location.host + window.location.pathname
    + "?xmin=" + parseInt(app.map.extent.xmin)
    + "&ymin=" + parseInt(app.map.extent.ymin)
    + "&xmax=" + parseInt(app.map.extent.xmax)
    + "&ymax=" + parseInt(app.map.extent.ymax)
    + "&baseMap=" + selectedBasemapStr
    + "&layerGroup=" + replaceAll($.trim($("input:radio[name='tocgroup']:checked").val()), ' ', '_');


    // If desktop version add in basemap opacity
    if (currentPage.indexOf("map") != -1) {
        queryString = queryString.concat("&basemapOpacity=" + parseInt(basemapOpacity));
    }
    // If themes being used then add this on to the URL query string
    if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
        // Desktop version
        if (currentPage.indexOf("map") != -1) {
            queryString = queryString.concat("&theme=" + replaceAll(document.getElementById("selectTheme").value, ' ', '_'));
        }
        // Mobile version
        if (currentPage.indexOf("mobile") != -1) {
            queryString = queryString.concat("&theme=" + replaceAll($('input[name=theme]:checked', '#themes').val(), ' ', '_'));
        }
    }

    return queryString;
};

// Clears all graphics from the map            
function clearAllGraphics() {
    app.map.graphics.clear();
    app.map.removeLayer("csvLayer_layer");

    // Clear drawing graphics
    if (drawingTool) {
        drawingLayer.clear();
        $('#textInputWrapper').empty();
        // Deactivate drawing tool
        drawingTool.deactivate();
        changeCursor('identify');
    }

    deactivateMeasureTool();
};

// Show the coorindates for the mouse pointer            
function showCoordinates(evt) {
    var mp = evt.mapPoint;
    dojo.byId("mapCoords").innerHTML = "X: " + Math.round(mp.x) + " Y: " + Math.round(mp.y);
};

// Set extent history
function extentHistoryChangeHandler() {
    $('#btnZoomPrev').attr("disabled", navToolbar.isFirstExtent());
    $('#btnZoomNext').attr("disabled", navToolbar.isLastExtent());
};

// Zoom to full extent setup in config
function zoomToFullExtent() {
    var fullExtent = new esri.geometry.Extent({ "xmin": configOptions.fullExtent.xmin, "ymin": configOptions.fullExtent.ymin, "xmax": configOptions.fullExtent.xmax, "ymax": configOptions.fullExtent.ymax, "spatialReference": { "wkid": configOptions.spatialReference.WKID } });
    app.map.setExtent(fullExtent);
};

// Set the cookie for the disclaimer popup
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + parseInt(configOptions.cookieLifeCycle));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

// Get the cookie for the disclaimer popup
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

// Replace all text in string
function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

// Convert Hex colour to RGB
function hexToRgb(h) {
    var r = parseInt((cutHex(h)).substring(0, 2), 16), g = parseInt((cutHex(h)).substring(2, 4), 16), b = parseInt((cutHex(h)).substring(4, 6), 16)
    return r + ', ' + g + ', ' + b;
}

// Cut # out of Hex
function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}

// Get a token for a secure service
function getToken(url, username, password, callback) {
    var requestParameters = "username=" + username + "&password=" + password + "&referer=http://localhost&expiration=5&f=json";

    // Make request to server for json data
    $.ajax({
        url: url + "/generateToken",
	data: requestParameters,
        dataType: "json",
        type: "POST",
        crossDomain: true,
        // Successful request
        success: function (data) {
            var token = data.token;
            callback(token);
        },
        // Error in request
        error: function (xhr, status, error) {
            alert(configOptions.errorMessageText + error);
        }
    });
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


// --------------------------------------------------------------------------- Identity manager functionality ---------------------------------------------------------------------------  
function setupIdentityManager() {
    // Identity manager login text
    esri.bundle.identity.info = configOptions.secureserviceloginmessage;

    // Setup identity manager handler for security - Cancel clicked
    dojo.connect(esri.id, "onDialogCancel", function (info) {
        secureLoginCount++;

        // Reset the layers added counter for the legend
        layersAdded = 0;

        // If it's the first login popup - Get last theme used
        if (secureLoginCount == 1) {
            lastThemeUsed = themesUsed[themesUsed.length - 2];
            lastLayerGroupUsed = layerGroupsUsed[layerGroupsUsed.length - 2];
        }
        var secureLayersCount = 0;

        // If themes enabled, switch back to previous theme
        if (configOptions.usethemes === "true" || configOptions.usethemes === true) {
            // Desktop version
            if (currentPage.indexOf("map") != -1) {
                // Get the layer group selected
                var selectedlayerGroup = $("input:radio[name='tocgroup']:checked").val();

                // Get the number of secure layers in this layer group
                $.each(operationalLayers, function () {
                    if (selectedlayerGroup == replaceAll(this.layerGroup, ' ', '_')) {
                        if (this.secure === true) {
                            secureLayersCount++;
                        }
                    }
                });

                // If we are at the last login popup and cancel, go back to previous theme
                if (secureLoginCount == secureLayersCount) {
                    document.getElementById("selectTheme").value = lastThemeUsed;
                    themeLoad();
                    // Reset login count
                    secureLoginCount = 0;
                }
            }
            // Mobile version
            if (currentPage.indexOf("mobile") != -1) {
                // Get the layer group selected
                var selectedlayerGroup = $("input:radio[name='tocgroup']:checked").val();

                // Get the number of secure layers in this layer group
                $.each(operationalLayers, function () {
                    if (selectedlayerGroup == replaceAll(this.layerGroup, ' ', '_')) {
                        if (this.secure === true) {
                            secureLayersCount++;
                        }
                    }
                });

                // If we are at the last login popup and cancel, go back to previous theme
                if (secureLoginCount == secureLayersCount) {
                    $("#theme" + replaceAll(lastThemeUsed, ' ', '_')).prop("checked", true);
                    themeLoad();
                    // Reset login count
                    secureLoginCount = 0;
                }
            }
        }
            // Otherwise switch back to previous layer group
        else {
            // Desktop version
            if (currentPage.indexOf("map") != -1) {
                // Get the layer group selected
                var selectedlayerGroup = $("input:radio[name='tocgroup']:checked").val();

                // Get the number of secure layers in this layer group
                $.each(operationalLayers, function () {
                    if (selectedlayerGroup == replaceAll(this.layerGroup, ' ', '_')) {
                        if (this.secure === true) {
                            secureLayersCount++;
                        }
                    }
                });
                // If we are at the last login popup and cancel, go back to previous layer group
                if (secureLoginCount == secureLayersCount) {
                    document.getElementById("layerGroup" + replaceAll(lastLayerGroupUsed, ' ', '_')).checked = true;
                    layerGroupChanged(lastLayerGroupUsed);
                    // Reset login count
                    secureLoginCount = 0;
                }
            }
            // Mobile version
            if (currentPage.indexOf("mobile") != -1) {
                // Get the layer group selected
                var selectedlayerGroup = $("input:radio[name='tocgroup']:checked").val();

                // Get the number of secure layers in this layer group
                $.each(operationalLayers, function () {
                    if (selectedlayerGroup == replaceAll(this.layerGroup, '_', ' ')) {
                        if (this.secure === true) {
                            secureLayersCount++;
                        }
                    }
                });

                // If we are at the last login popup and cancel, go back to previous layer group
                if (secureLoginCount == secureLayersCount) {
                    $("#layerGroup" + replaceAll(lastLayerGroupUsed, ' ', '_')).prop("checked", true);
                    layerGroupChanged(lastLayerGroupUsed);
                    // Reset login count
                    secureLoginCount = 0;
                }
            }
        }
    });
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------- Google analytics tracking ---------------------------------------------------------------------------  
// Setup google analytics
function loadGoogleAnalytics(acct) {
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."),
        pageTracker,
        s;
    s = document.createElement('script');
    s.src = gaJsHost + 'google-analytics.com/ga.js';
    s.type = 'text/javascript';
    s.onloadDone = false;
    function init() {
        pageTracker = _gat._getTracker(acct);
        pageTracker._trackPageview();
    }
    s.onload = function () {
        s.onloadDone = true;
        init();
    };
    s.onreadystatechange = function () {
        if (('loaded' === s.readyState || 'complete' === s.readyState) && !s.onloadDone) {
            s.onloadDone = true;
            init();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


// --------------------------------------------------------------------------- Geolocation functionality ---------------------------------------------------------------------------  
// Geolocation button click handler
function gotoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, locationError);
    }
    else {
        alert("Browser doesn't support Geolocation. Visit http://caniuse.com to discover browser support for the Geolocation API.");
    }
}

// Geolocation show location
function showLocation(location) {
    // Close tools dialog
    // Mobile version
    if (currentPage.indexOf("mobile") != -1) {
        $('#toolsPopup').popup('close');
    }
    var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
    var outSR = new esri.SpatialReference({ wkid: 2193 });
    gsvc = new esri.tasks.GeometryService(configOptions.geometryserviceurl);
    gsvc.project([pt], outSR, function (features) {
        var newpt = features[0];
        var newcoords = newpt.x + ", " + newpt.y;
        var symbol = configOptions.markerSymbol;
        app.map.graphics.add(new esri.Graphic(newpt, symbol));

        // Factor for converting point to extent 
        var factor = 20;

        var extent = new esri.geometry.Extent(newpt.x - factor, newpt.y - factor, newpt.x + factor, newpt.y + factor, app.map.spatialReference);
        // Zoom to feature and expand out extent
        app.map.setExtent(extent.expand(configOptions.searchZoomBuffer));
    });
}

// Geolocation error handler
function locationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("Location not provided");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Current location not available");
            break;
        case error.TIMEOUT:
            console.log("Timeout");
            break;
        default:
            console.log("Unknown error");
            break;
    }
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  