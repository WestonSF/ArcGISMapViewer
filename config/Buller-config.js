var configOptions;

function initVariables() {
    configOptions = {
        webTitle: "BullerView", // Title in the web window
        logo: "<img src=\"images/logo/Buller_Logo.JPG\" height=\"50\" width=\"180\">", // Images for splash screen and bottom right

        // ArcGIS Javascript API address
        jsapiaddress: "http://js.arcgis.com/3.7compact",

        // ID from google analytics
        googleanalyticsID: "",

        // Use ArcGIS Online web map
        useAGSOnlineWebMap: false,
        webmapID: "",

        // Enables the themes dropdown to switch between map configs
        usethemes: false,
        // Initial theme to load
        initialtheme: "",
        // List and configure map themes
        themes: [],

        // Specify the url to a geometry service 
        geometryserviceurl: "http://sirius.bdc.govt.nz/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        // Specify the locators and query task to use for searching
        searchParams: [
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/BullerLocator/GeocodeServer",
                name: "All",
                outFields: "*",
                locatorName: "WestCoast",
                singleLineFieldName: "SingleLine"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/AddressLocator/GeocodeServer", // URL of locator service
                name: "Address", // Name of locator to appear in searches dropdown
                locatorName: "Address", // Name of locator in composite locator
                singleLineFieldName: "Single Line Input", // Name of field in locator for single line search
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer/0", // URL of map service to search after locator
                searchField: "FULLNAME" // Name of field to search in map service
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/FeatureLocator/GeocodeServer",
                name: "Road",
                locatorName: "Road",
                singleLineFieldName: "SingleLineCityName",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer/2",
                searchField: "FULLNAME"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/ValuationLocator/GeocodeServer",
                name: "Valuation ID",
                locatorName: "Valuation",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer/0",
                searchField: "Valuation_No"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/RatepayerLocator/GeocodeServer",
                name: "Ratepayer",
                locatorName: "Ratepayer",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer/1",
                searchField: "Ratepayer"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/FeatureLocator/GeocodeServer",
                name: "Feature",
                locatorName: "Feature",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Features/MapServer/0",
                searchField: "NAME"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/LegalDescriptionLocator/GeocodeServer",
                name: "Legal Description",
                locatorName: "Legal",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer/1",
                searchField: "legal_LEGAL_DESC_TEXT"
            },
            {
                url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Locators/RatepayerLocator/GeocodeServer",
                name: "Parcel ID",
                locatorName: "Parcel",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer/0",
                searchField: "PAR_ID"
            }

        ],
        // Default search text on startup
        searchDefault: "",
        // Automatically show info Window for these layers - Use name from above
        searchautopopup: ["Address", "Legal Description", "Ratepayer", "Valuation ID"],
        // Search zoom buffer - Buffer out the result by the number
        searchZoomBuffer: 2,
        // Identify setup the GIS services that are identifiable and what tab they will appear on - id from operational layers
        identifyParams: [
                        {
                            id: "Parcels",
                            identifyTask: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer",
                            tolerance: 1,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Parcel", tabindex: 2, layerName: "Parcel", displayFormat: "<B>Parcel ID: [#PAR_ID#]</B> <br/><br/> Type: [#FEATCODE#] <br/> Intent: [#PARCEL_INTENT#] <br/> Area: [#PARCEL_AREA#]" }
                            ]
                        },
                        {
                            id: "Property",
                            identifyTask: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer",
                            tolerance: 1,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Property", tabindex: 1, layerName: "Property", displayFormat: "<B>Location: [#Location#]</B> <br/><br/> Valuation ID: [#Valuation_No#] <br/> Legal Description: [#Property_Legal_Description#] <br/> Hectares: [#Hectares#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/> Improvements Value: [#Improvements_Value#] <br/> Total Rates: [#Total_Rates_for_This_Year#] <br/><br/> <U>Ratepayer(s)</U> <br/> [#Payer1_Name#] <br/> [#Payer1_Name#] <br/><br/> <U>Address</U> <br/> [#Ratepayer_Address1#] <br/> [#Ratepayer_Address2#] <br/> [#Ratepayer_Address3#] <br/> [#Ratepayer_Address4#] <br/><br/> <a href='http://linux.bdc.govt.nz/cgi-bin/rating/rapp?pp&KK1&[#Valuation_No#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a>  <br/><br/>  <a id='showReport' style=\"color:blue\" href='#' onclick='generatePropertyReport(&quot;[#Valuation_No#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" }
                            ]
                        }
        ],
        // The size of the popup window
        infowWindowSize: [360, 280],
        // What scale and below will identify be available
        maxidentifyscale: 500000,
        // What scale and below will Google street View be available
        maxstreetviewscale: 50000,
        // Identify features when not visible
        identifynotvisible: false,

        // Map navigation config
        // Time in milliseconds; default is 250
        zoomDuration: 20,
        // Refresh rate of zoom animation; default is 25
        zoomRate: 5,
        // Time in milliseconds; default is 350
        panDuration: 20,
        // Refresh rate of zoom animation; default is 50
        panRate: 5,

        // Default click mode when application starts e.g. "identify","pan","zoomin","zoomout"
        clickDefault: "identify",

        // Tool to be open when application starts e.g. "none","layers","tools","print"
        onloadTool: "layers",

        // Display labels along side the zoom slider e.g. District, town, property.
        displayzoomsliderlabels: false,
        // Display go to full extent button
        displayfullextent: true,
        // Display zoom to scale dropdown
        displayzoomtoscale: true,
        displaycoordinates: true,
        displaysearch: true,
        displayscalebar: true,
        displayshare: true,
        usecompactslider: false,
        displaytransparencyslider: true,
        displayMeasure: true,
        displaybasemaps: true,
        displayCursorMode: true,
        displaytoolbar: true,
        displaytools: true,
        displayadmin: false,
        displaylocate: true,
        displaynavigation: true,
        displaylegend: true,
        displaylayerlist: true,
        displayoverviewmap: true, // Not used
        displayeditor: false, // Not used
        displaybookmarks: true, // Not used
        displaytimeslider: true, // Not used
        displayclearmap: true,
        displaystreetview: true,

        // Proxy details
        alwaysuseproxy: false,
        // Proxy page needs to be on same server as application and in root IIS directory. Required for tools to work in IE8/IE9.
        proxyurl: "http://sirius.bdc.govt.nz/proxy/proxy.ashx",

        // Display help button
        displayhelp: true,
        helpUrl: "help/SpliceMapsHelpGuide_v2_0.pdf",

        // Text to show in error message alert
        errorMessageText: "The following error has occurred, please try again and/or contact gissupport@eagle.co.nz \n\n",

        // If set to true, change cookie life cycle below so that the user doesn't see the splashscreen every time they open their browser
        displaysplashscreen: false,
        // If displaysplashscreen set to true, specify cookie life cycle in milliseconds, e.g. 30 days = 2592000000
        cookieLifeCycle: 0,
        // Text to go into the splash screen
        splashscreentitletext: "",
        splashscreentext: "",

        extentBounds: { xmin: 1391399, xmax: 1629525, ymin: 5317043, ymax: 5475793 }, // Max extent
        initialExtent: { xmin: 1391399, xmax: 1629525, ymin: 5317043, ymax: 5475793 }, // First loads
        fullExtent: { xmin: 1391399, xmax: 1629525, ymin: 5317043, ymax: 5475793 }, // Shapefile extent

        spatialReference: { WKID: 2193, name: "NZTM", xlabel: "x", ylabel: "y" },
        wraparound180: false, // true for web mercator only

        setlods: true, // Set the scales to be used in the application
        lods: [
          {
              "level": 0,
              "resolution": 529.1677250021168,
              "scale": 2000000
          },
          {
              "level": 1,
              "resolution": 264.5838625010584,
              "scale": 1000000
          },
          {
              "level": 2,
              "resolution": 132.2919312505292,
              "scale": 500000
          },
          {
              "level": 3,
              "resolution": 66.1459656252646,
              "scale": 250000
          },
          {
              "level": 4,
              "resolution": 33.0729828126323,
              "scale": 125000
          },
          {
              "level": 5,
              "resolution": 19.843789687579378,
              "scale": 75000
          },
          {
              "level": 6,
              "resolution": 13.229193125052918,
              "scale": 50000
          },
          {
              "level": 7,
              "resolution": 5.291677250021167,
              "scale": 20000
          },
          {
              "level": 8,
              "resolution": 2.6458386250105836,
              "scale": 10000
          },
          {
              "level": 9,
              "resolution": 1.3229193125052918,
              "scale": 5000
          },
          {
              "level": 10,
              "resolution": 0.6614596562526459,
              "scale": 2500
          },
          {
              "level": 11,
              "resolution": 0.39687579375158755,
              "scale": 1500
          },
          {
              "level": 12,
              "resolution": 0.26458386250105836,
              "scale": 1000
          },
          {
              "level": 13,
              "resolution": 0.13229193125052918,
              "scale": 500
          },
          {
              "level": 14,
              "resolution": 0.06614596562526459,
              "scale": 250
          },
          {
              "level": 15,
              "resolution": 0.026458386250105836,
              "scale": 100
          }
        ],
        initialbasemap: "Topographic",
        // {basemap:new esri.dijit.Basemap({layers:[new esri.dijit.BasemapLayer({url:"....."})],title:".....",thumbnailUrl:"....."})}, // MUST HAVE BRACKETS IN THE RIGHT PLACE (and don't forget no comma on the end of the last one)
        basemaps: [
                  { basemap: new esri.dijit.Basemap({ id: "Topographic", title: "Topographic", layers: [new esri.dijit.BasemapLayer({ url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Basemaps/TopoEsri/MapServer" })], thumbnailUrl: "images/basemap/basemap-topo.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Imagery1998", title: "Imagery - 1998", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/Imagery1998/MapServer" })], thumbnailUrl: "images/basemap/basemap-oldimagery.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Imagery2010", title: "Imagery - 2010", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/Imagery2010/MapServer" })], thumbnailUrl: "images/basemap/basemap-imagery.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Imagery2013", title: "Imagery - 2013", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/Imagery2013/MapServer" })], thumbnailUrl: "images/basemap/basemap-imagery.png" }) }
        ],

        // If true, displays all map services/layers for each grouping, if false, just shows layer groupings
        displaylayers: true,
        // Display layer mode button
        displayLayerMode: true,
        // Default layer mode - Simple or Advanced
        defaultLayerMode: "Simple",
        // Layer modes - Simple or Advanced
        layerModes: [
                { label: "Simple", value: "simple" },
                { label: "Advanced", value: "advanced" }
        ],
        // Initial layer grouping to show
        initiallayergroup: "Property Information",
        // The groups and a description for each
        layergroups: [
                        { name: "Property Information", description: "" },
                        { name: "District Plan", description: "" },
                        { name: "Environment", description: "" },
                        { name: "Services", description: "" }
        ],
        // Map services to setup and groupings to assign to - id: No spaces and used in code to identify layer, name: Can have any character and will appear to user
        operationalLayers: [
                  { layerGroup: "Imagery", id: 'cacheLayer', name: 'Roads', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer" },
                  { layerGroup: "Imagery", id: 'cacheLayer2', name: 'Addresses', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer" },

                  { layerGroup: "Property Information", id: 'Parcels', name: 'Parcels', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer" },
                  { layerGroup: "Property Information", id: 'Property', name: 'Property', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer" },

                  { layerGroup: "District Plan", id: 'PlanningFeatures', name: 'District Plan Features', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningFeatures/MapServer" },
                  { layerGroup: "District Plan", id: 'PlanningSpecial', name: 'District Plan Special Features', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningSpecial/MapServer" },
                  { layerGroup: "District Plan", id: 'PlanningZones', name: 'District Plan Zones', visible: true, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningZones/MapServer" },

                  { layerGroup: "Environment", id: 'CoastalHazards', name: 'Coastal Hazards', visible: false, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Environment/CoastalHazards/MapServer" },
                  { layerGroup: "Environment", id: 'Contours', name: 'Contours', visible: false, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Environment/Contours/MapServer" },
                  { layerGroup: "Environment", id: 'Lidar', name: 'Lidar', visible: false, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Environment/Lidar/MapServer" },
                  { layerGroup: "Environment", id: 'FloodDepth', name: 'Flood Depth', visible: false, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Environment/FloodDepth/MapServer" },
                  { layerGroup: "Environment", id: 'FloodWaterLevel', name: 'Flood Water Level', visible: false, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Environment/FloodWaterLevel/MapServer" },

                  { layerGroup: "Services", id: 'SewerServices', name: 'Sewer Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Services/SewerServices/MapServer" },
                  { layerGroup: "Services", id: 'StormwaterServices', name: 'Stormwater Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Services/StormwaterServices/MapServer" },
                  { layerGroup: "Services", id: 'WaterServices', name: 'Water Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Services/WaterServices/MapServer" },
                  { layerGroup: "Services", id: 'MaintenanceServices', name: 'Maintenance Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://sirius.bdc.govt.nz/arcgis/rest/services/Services/MaintenanceServices/MapServer" }
        ],
        // Secure service login message
        secureserviceloginmessage: "<B>This area of the site is secure. Contact the GIS Administrator for login credentials.</B> <br\><br\>Server - ${server} <br\>Service - ${resource}",

        // Preset bookmarks
        bookmarks_list: [{
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1481723,
                "ymin": 5374813,
                "xmax": 1486485,
                "ymax": 5377988
            },
            "name": "Westport"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1504737,
                "ymin": 5335992,
                "xmax": 1507118,
                "ymax": 5337580
            },
            "name": "Reefton"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1511593,
                "ymin": 5364832,
                "xmax": 1513975,
                "ymax": 5366419
            },
            "name": "Inangahua"
        }],

        // Identify and search symbology
        polygonSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 3, 0.7), new dojo.Color([0, 255, 255, 0])),
        lineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 6, 0.7),
        markerSymbol: new esri.symbol.PictureMarkerSymbol("images/pin.png", 14, 19),

        // Measure symbology
        measureLineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 2),
        measureMarkerSymbol: new esri.symbol.PictureMarkerSymbol("images/flag.png", 15, 18),
        measureSymbolOffset: { x: 5, y: 9 },

        // Print configuration
        displayprint: true,
        printedmaptitle: "",
        printedmapauthortext: "", // If in the print service mxd
        printedmapcopyrighttext: "",  // If in the print service mxd
        printQuality: [ // label: "....", dpi: "..."
                        { label: "Low", dpi: "60" },
                        { label: "Med", dpi: "96" },
                        { label: "High", dpi: "200" }
        ],
        printLayouts: [
                        { label: 'A4 Landscape', layout: 'A4 Landscape' },
                        { label: 'A3 Landscape', layout: 'A3 Landscape' },
                        { label: 'A4 Portrait', layout: 'A4 Portrait' },
                        { label: 'A3 Portrait', layout: 'A3 Portrait' },
                        { label: 'Map Only', layout: 'MAP_ONLY' }
        ],
        printFormats: [
                        { label: "PDF", value: "PDF" },
                        { label: "JPG", value: "JPG" },
                        { label: "PNG", value: "PNG32" }
        ],
        // To set the scale from the map or not
        printPreserveScale: false,
        printAsync: false,
        printtask: "http://sirius.bdc.govt.nz/arcgis/rest/services/Tools/ExportWebMap/GPServer/Export%20Web%20Map",

        // Reporting configuration
        displaypropertyreport: true,
        propertyreporttask: "http://sirius.bdc.govt.nz/arcgis/rest/services/Tools/PropertyReport/GPServer/Property%20Report",
        propertyreportMapServiceIdentify:
        {
            id: "Property",
            identifyTask: "http://sirius.bdc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer",
            tolerance: 1,
            returnGeometry: true,
            layerIds: [0], // layer ids in map service
            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
              { tabName: "Property", tabindex: 1, layerName: "Property", displayFormat: "<B>Location: [#Location#]</B> <br/><br/> Valuation ID: [#Valuation_No#] <br/> Legal Description: [#Property_Legal_Description#] <br/> Hectares: [#Hectares#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/> Improvements Value: [#Improvements_Value#] <br/> Total Rates: [#Total_Rates_for_This_Year#] <br/><br/> <U>Ratepayer(s)</U> <br/> [#Payer1_Name#] <br/> [#Payer1_Name#] <br/><br/> <U>Address</U> <br/> [#Ratepayer_Address1#] <br/> [#Ratepayer_Address2#] <br/> [#Ratepayer_Address3#] <br/> [#Ratepayer_Address4#] <br/><br/> <a href='http://www.wcrc.govt.nz/rates/wcrc_property_report2.asp?VNZ=[#Valuation_No#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a>  <br/><br/>  <a id='showReport' style=\"color:blue\" href='#' onclick='generatePropertyReport(&quot;[#Valuation_No#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" }
            ]
        },
        propertyreportinputParameter: "Property_ID",
        propertyreportoutputParameter: "Output_PDF",
        // Reports configuration
        displayReports: false,
        reportsTask: "",
        reportsTaskToken: "",
        propertyIDField: "",
        propertyAddressField: "",
        reportsInputParameter1: "",
        reportsInputParameter2: "",
        reportsOutputParameter: "",
        reports: [],

        // Draw tool configuration
        displayDraw: true,
        defaultDrawColour: "3166ff",
        drawcolours: ["ffffff", "ffccc9", "ffce93", "fffc9e", "ffffc7", "9aff99", "96fffb", "cdffff", "cbcefb", "cfcfcf", "fd6864", "fe996b", "fffe65", "fcff2f", "67fd9a", "38fff8", "68fdff", "9698ed", "c0c0c0", "fe0000",
        "f8a102", "ffcc67", "f8ff00", "34ff34", "68cbd0", "34cdf9", "6665cd", "9b9b9b", "cb0000", "f56b00", "ffcb2f", "ffc702", "32cb00", "00d2cb", "3166ff", "6434fc", "656565", "9a0000", "ce6301", "cd9934", "999903",
        "009901", "329a9d", "3531ff", "6200c9", "343434", "680100", "963400", "986536", "646809", "036400", "34696d", "00009b", "303498", "000000", "330001", "643403", "663234", "343300", "013300", "013300", "003532",
        "010066", "340096"],

        // Add XY data configuration
        displayaddxy: true,
        defaultCSVColour: "343434",
        csvcolours: ["ffffff", "ffccc9", "ffce93", "fffc9e", "ffffc7", "9aff99", "96fffb", "cdffff", "cbcefb", "cfcfcf", "fd6864", "fe996b", "fffe65", "fcff2f", "67fd9a", "38fff8", "68fdff", "9698ed", "c0c0c0", "fe0000",
        "f8a102", "ffcc67", "f8ff00", "34ff34", "68cbd0", "34cdf9", "6665cd", "9b9b9b", "cb0000", "f56b00", "ffcb2f", "ffc702", "32cb00", "00d2cb", "3166ff", "6434fc", "656565", "9a0000", "ce6301", "cd9934", "999903",
        "009901", "329a9d", "3531ff", "6200c9", "343434", "680100", "963400", "986536", "646809", "036400", "34696d", "00009b", "303498", "000000", "330001", "643403", "663234", "343300", "013300", "013300", "003532",
        "010066", "340096"],
        // Acceptable Y value column names for importing points via CSV file
        latFieldStrings: ["Lat", "Latitude", "Y", "YCenter"],
        // Acceptable X value column names for importing points via CSV file
        longFieldStrings: ["Lon", "Long", "longitude", "X", "XCenter"],

        // Add shapefile configuration
        displayaddshapefile: true,
        defaultShapefileColour: "00009b",
        shapefilecolours: ["ffffff", "ffccc9", "ffce93", "fffc9e", "ffffc7", "9aff99", "96fffb", "cdffff", "cbcefb", "cfcfcf", "fd6864", "fe996b", "fffe65", "fcff2f", "67fd9a", "38fff8", "68fdff", "9698ed", "c0c0c0", "fe0000",
        "f8a102", "ffcc67", "f8ff00", "34ff34", "68cbd0", "34cdf9", "6665cd", "9b9b9b", "cb0000", "f56b00", "ffcb2f", "ffc702", "32cb00", "00d2cb", "3166ff", "6434fc", "656565", "9a0000", "ce6301", "cd9934", "999903",
        "009901", "329a9d", "3531ff", "6200c9", "343434", "680100", "963400", "986536", "646809", "036400", "34696d", "00009b", "303498", "000000", "330001", "643403", "663234", "343300", "013300", "013300", "003532",
        "010066", "340096"],

        // Gallery portal 
        // The arcgis online group that contains the applications to display
        group: {},
        // The url of the portal
        portalUrl: 'http://www.arcgis.com',

        // Closest facility configuration
        displayClosestFacility: false,
        // What scale and below will closest feature be available
        maxClosestFacilityScale: 250000,
        // Symbology for the route and facility
        routeLineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 6, 0.7),
        facilityMarkerSymbol: new esri.symbol.PictureMarkerSymbol("images/pin.png", 14, 19),
        // Zoom buffer for route
        routeZoomBuffer: 2,
        // Maximum time in minutes allowed to search for
        cutOffTime: 15,
        // ArcGIS Online network service or custom network service
        closestFacilityService: {
            url: "",
            secure: true,
            tokenURL: "",
            // Username/password for ArcGIS Online - Needs to be an organisation account to have access to the network services
            username: "",
            password: ""
        },
        // Map service with features to be setup as facilities.
        facilitiesURL: "",
        facilityName: ""
    };
}
