var configOptions;

function initVariables() {
    configOptions = {
        // --------------------------------------------------------------------------- General ---------------------------------------------------------------------------  
        // Title in the web window
        webTitle: "WestMaps",
        // Images for splash screen and bottom right
        logo: "<img src=\"images/logo/WestCoastBuller_Logo.JPG\" height=\"50\" width=\"140\">",

        // ArcGIS Javascript API address
        jsapiaddress: "http://gis.wcrc.govt.nz/ArcGISJavascriptAPI/3.7compact",

        // ID from google analytics
        googleanalyticsID: "UA-41202243-1",

        // Specify the url to a geometry service 
        geometryserviceurl: "http://gis.wcrc.govt.nz/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        // Map navigation config
        // Time in milliseconds; default is 250
        zoomDuration: 20,
        // Refresh rate of zoom animation; default is 25
        zoomRate: 5,
        // Time in milliseconds; default is 350
        panDuration: 20,
        // Refresh rate of zoom animation; default is 50
        panRate: 5,

        // Proxy details
        alwaysuseproxy: false,
        // Proxy page needs to be on same server as application and in root IIS directory. Required for tools to work in IE8/IE9.
        proxyurl: "http://gis.wcrc.govt.nz/proxy/proxy.ashx",

        // Display help button
        displayhelp: true,
        helpUrl: "help/MapViewerHelpGuide.pdf",

        // Text to show in error message alert
        errorMessageText: "The following error has occurred, please try again and/or contact gissupport@eagle.co.nz \n\n",

        // Default click mode when application starts e.g. "identify","pan","zoomin","zoomout"
        clickDefault: "identify",

        // Tool to be open when application starts e.g. "none","layers","tools","print"
        onloadTool: "layers",
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Extent & Scales ---------------------------------------------------------------------------  
        // Max extent
        extentBounds: { xmin: 1044662, xmax: 1759038, ymin: 5052697, ymax: 5528948 },
        // First loads
        initialExtent: { xmin: 1044662, xmax: 1759038, ymin: 5052697, ymax: 5528948 },
        // Shapefile extent
        fullExtent: { xmin: 1044662, xmax: 1759038, ymin: 5052697, ymax: 5528948 }, 

        spatialReference: { WKID: 2193, name: "NZTM", xlabel: "X", ylabel: "Y" },
        wraparound180: false,

        // Set the scales to be used in the application
        setlods: true, 
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
          }
        ],
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


        // --------------------------------------------------------------------------- Symbology ---------------------------------------------------------------------------  
        // Identify and search symbology
        polygonSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 3, 0.7), new dojo.Color([0, 255, 255, 0])),
        lineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 6, 0.7),
        markerSymbol: new esri.symbol.PictureMarkerSymbol("images/pin.png", 14, 19),

        // Measure symbology
        measureLineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 2),
        measureMarkerSymbol: new esri.symbol.PictureMarkerSymbol("images/flag.png", 15, 18),
        measureSymbolOffset: { x: 5, y: 9 },
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


        // --------------------------------------------------------------------------- Themes ---------------------------------------------------------------------------  
        // Use ArcGIS Online web map
        useAGSOnlineWebMap: false,
        webmapID: "",

        // Gallery portal 
        // The arcgis online group that contains the applications to display
        galleryGroup: {
            owner: "",
            title: ""
        },
        // The url of the portal
        galleryPortalUrl: "",

        // Enables the themes dropdown to switch between map configs
        usethemes: false,
        // Initial theme to load
        initialtheme: "",
        // List and configure map themes
        themes: [],
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Layers ---------------------------------------------------------------------------  
        // The arcgis online group that contains the basemaps to display
        useAGSOnlineBasemaps: false,
        basemapsGroup: {
            owner: "",
            title: ""
        },
        // The url of the portal
        basemapsPortalUrl: "",

        initialbasemap: "Topographic",
        // Basemaps available for selection
        basemaps: [
                  { basemap: new esri.dijit.Basemap({ id: "Topographic", title: "Topographic", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/TopoEsri/MapServer" })], thumbnailUrl: "images/basemap/basemap-topo.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Streets", title: "Streets", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/StreetsEsri/MapServer" })], thumbnailUrl: "images/basemap/basemap-streets.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Imagery1998", title: "Imagery - 1998 (Buller)", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/Imagery1998/MapServer" })], thumbnailUrl: "images/basemap/basemap-oldimagery.png" }) },
                  { basemap: new esri.dijit.Basemap({ id: "Imagery2010", title: "Imagery - 2010 (West Coast)", layers: [new esri.dijit.BasemapLayer({ url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Basemaps/Imagery2010/MapServer" })], thumbnailUrl: "images/basemap/basemap-imagery.png" }) }
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
                        { name: "Property Information", description: "Properties and boundaries for the West Coast region" },
                        { name: "Regional Plan", description: "Management areas and consents for the West Coast region" },
                        { name: "District Plan - Buller", description: "District plan for Buller District including zones and features" },
                        { name: "Hazards - Buller District", description: "Hazards for the Buller District" },
                        { name: "Services - Buller District", description: "Water, stormwater and sewer networks for Buller District" },
                        { name: "Specified Land Use - Internal", description: "Sites associated with hazardous substances for internal use only" }
        ],
        // Map services to setup and groupings to assign to - id: No spaces and used in code to identify layer, name: Can have any character and will appear to user. If using ArcGIS Online, just need layerGroup, id and optionally name
        operationalLayers: [
                  { layerGroup: "Imagery", id: 'cacheLayer', name: 'Roads', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer" },
                  { layerGroup: "Imagery", id: 'cacheLayer2', name: 'Addresses', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer" },

                  { layerGroup: "Property Information", id: 'Boundaries', name: 'Boundaries', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Boundaries/MapServer" },
                  { layerGroup: "Property Information", id: 'Parcels', name: 'Parcels', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer" },
                  { layerGroup: "Property Information", id: 'Property', name: 'Property', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer" },

                  { layerGroup: "Regional Plan", id: 'ManagementPlans', name: 'Management Plans', visible: true, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/ManagementPlans/MapServer" },
                  { layerGroup: "Regional Plan", id: 'Consents', name: 'Consents', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/Consents/MapServer" },

                  { layerGroup: "District Plan - Buller", id: 'PlanningFeatures', name: 'District Plan Features', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningFeatures/MapServer" },
                  { layerGroup: "District Plan - Buller", id: 'PlanningSpecial', name: 'District Plan Special Features', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningSpecial/MapServer" },
                  { layerGroup: "District Plan - Buller", id: 'PlanningZones', name: 'District Plan Zones', visible: true, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/PlanningZones/MapServer" },

                  { layerGroup: "Hazards - Buller District", id: 'CoastalHazards', name: 'Coastal Hazards', visible: true, opacity: 0.7, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/EmergencyManagementAndHazards/CoastalHazards/MapServer" },

                  { layerGroup: "Services - Buller District", id: 'SewerServices', name: 'Sewer Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Services/SewerServices/MapServer" },
                  { layerGroup: "Services - Buller District", id: 'StormwaterServices', name: 'Stormwater Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Services/StormwaterServices/MapServer" },
                  { layerGroup: "Services - Buller District", id: 'WaterServices', name: 'Water Services', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Services/WaterServices/MapServer" },

                  { layerGroup: "Specified Land Use - Internal", id: 'SitesAssociatedHazardousSubstances', name: 'Sites Associated With Hazardous Substances', visible: true, opacity: 0.9, layerList: true, legend: true, printLegend: true, secure: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/EmergencyManagementAndHazards/SitesAssociatedHazardousSubstances/MapServer" },
                  { layerGroup: "Specified Land Use - Internal", id: 'ParcelsSAHS', name: 'Parcels', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer" },
                  { layerGroup: "Specified Land Use - Internal", id: 'PropertySAHS', name: 'Property', visible: true, opacity: 0.9, layerList: true, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer" }
        ],
        // Secure service login message
        secureserviceloginmessage: "<B>This area of the site is secure. Contact the GIS Administrator for login credentials.</B> <br\><br\>Server - ${server} <br\>Service - ${resource}",
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Searches ---------------------------------------------------------------------------  
        // Specify the locators and query task to use for searching
        searchParams: [
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/WestCoastLocator/GeocodeServer",
                name: "All",
                outFields: "*",
                locatorName: "WestCoast",
                singleLineFieldName: "SingleLine"
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/AddressLocator/GeocodeServer", // URL of locator service
                name: "Address", // Name of locator to appear in searches dropdown
                locatorName: "Address", // Name of locator in composite locator
                singleLineFieldName: "Single Line Input", // Name of field in locator for single line search
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer/0", // URL of map service to search after locator
                searchField: "FULLADDRESS" // Name of field to search in map service
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/RoadLocator/GeocodeServer",
                name: "Road",
                locatorName: "Road",
                singleLineFieldName: "SingleLineCityName",
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer/2",
                searchField: "FULLNAME"
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/FeatureLocator/GeocodeServer",
                name: "Feature",
                locatorName: "Feature",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Features/MapServer/0",
                searchField: "NAME"
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/LegalDescriptionLocator/GeocodeServer",
                name: "Legal Description",
                locatorName: "Legal",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer/1",
                searchField: "Title"
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/AssessmentLocator/GeocodeServer",
                name: "Assessment Number",
                locatorName: "Assessment",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer/0",
                searchField: "Assessment_Number"
            },
            {
                url: "http://gis.wcrc.govt.nz/arcgis/rest/services/Locators/ValuationLocator/GeocodeServer",
                name: "Valuation ID",
                locatorName: "Valuation",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer/1",
                searchField: "Valuation_Reference"
            }
        ],
        // Default search text on startup
        searchDefault: "",
        // Automatically show info Window for these layers - Use name from above
        searchautopopup: ["Address", "Legal Description", "Assessment Number", "Valuation ID"],
        // Search zoom buffer - Buffer out the result by the number
        searchZoomBuffer: 2,
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Identify ---------------------------------------------------------------------------  
        // Identify setup the GIS services that are identifiable and what tab they will appear on - id from operational layers
        identifyParams: [
                        {
                            id: "Parcels",
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer",
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
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer",
                            tolerance: 1,
                            returnGeometry: true,
                            layerIds: [0, 1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Property - West Coast", tabindex: 1, layerName: "Property (West Coast)", displayFormat: "<B>Location: [#Street_Address#], [#Suburb_Town#]</B> <br/><br/> Valuation Reference: [#Valuation_Reference#] <br/> Assessment Number: [#Assessment_Number#] <br/> Legal Description: [#Title#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/><br/> <a href='http://rates.wcrc.netprod.datacomcc.com/wcrc_property_report3.asp?VNZ=[#Valuation_Reference#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a>  <br/><br/>  <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_Reference#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" },
                                { tabName: "Property - Buller", tabindex: 1, layerName: "Property (Buller)", displayFormat: "<B>Location: [#Location#]</B> <br/><br/> Valuation No: [#Valuation_ID#] <br/> Legal Description: [#Legal#] <br/> Hectares: [#Hectares#] <br/> Rates: [#Total_Rates_For_This_Year#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/> Improvements Value: [#Improvements_Value#] <br/><br/> <a href='http://public.bullerdc.govt.nz/cgi-bin/rating/rapp?pp&KK1&[#Valuation_ID#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a> <br/><br/> <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_ID#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" }
                            ]
                        },

                        {
                            id: "Consents",
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/ResourceManagementAndPlanning/Consents/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1, 2, 3], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Coastal Consent", tabindex: 2, layerName: "Coastal", displayFormat: "<B>Type: [#Type#] <br/> Subtype: [#Subtype#]</B> <br/><br/> Purpose: [#Purpose#] <br/> Activity: [#Activity#] <br/> Status: [#Status#] <br/> Authority Number: [#Auth_no#]" },
                                { tabName: "Discharge Consent", tabindex: 2, layerName: "Discharge", displayFormat: "<B>Type: [#Type#] <br/> Subtype: [#Subtype#]</B> <br/><br/> Purpose: [#Purpose#] <br/> Activity: [#Activity#] <br/> Status: [#Status#] <br/> Authority Number: [#Auth_no#]" },
                                { tabName: "Land Use Consent", tabindex: 1, layerName: "Land Use", displayFormat: "<B>Type: [#Type#] <br/> Subtype: [#Subtype#]</B> <br/><br/> Purpose: [#Purpose#] <br/> Activity: [#Activity#] <br/> Status: [#Status#] <br/> Authority Number: [#Auth_no#]" },
                                { tabName: "Water Consent", tabindex: 2, layerName: "Water", displayFormat: "<B>Type: [#Type#] <br/> Subtype: [#Subtype#]</B> <br/><br/> Purpose: [#Purpose#] <br/> Activity: [#Activity#] <br/> Status: [#Status#] <br/> Authority Number: [#Auth_no#]" }
                            ]
                        },

                        {
                            id: "SitesAssociatedHazardousSubstances",
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/EmergencyManagementAndHazards/SitesAssociatedHazardousSubstances/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Hazardous Site", tabindex: 1, layerName: "Sites Associated with Hazardous Substances", displayFormat: "<B>ID: [#SAHS_ID#] <br/> Type: [#HAIL#] <br/> Classification: [#classification#]</B> <br/><br/> Address: [#ADDRESS#] <br/> Legal Description: [#LEGAL_DESC#] <br/> Owner: [#SURNAME#] [#first_names#] <br/><br/> Comments: [#letter_comments#]" }
                            ]
                        },
                        {
                            id: "ParcelsSAHS",
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer",
                            tolerance: 1,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Parcel", tabindex: 2, layerName: "Parcel", displayFormat: "<B>Parcel ID: [#PAR_ID#]</B> <br/><br/> Type: [#FEATCODE#] <br/> Intent: [#PARCEL_INTENT#] <br/> Area: [#PARCEL_AREA#]" }
                            ]
                        },
                        {
                            id: "PropertySAHS",
                            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer",
                            tolerance: 1,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Property - West Coast", tabindex: 1, layerName: "Property (West Coast)", displayFormat: "<B>Location: [#Street_Address#], [#Suburb_Town#]</B> <br/><br/> Valuation Reference: [#Valuation_Reference#] <br/> Assessment Number: [#Assessment_Number#] <br/> Legal Description: [#Title#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/><br/> <a href='http://rates.wcrc.netprod.datacomcc.com/wcrc_property_report3.asp?VNZ=[#Valuation_Reference#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a>  <br/><br/>  <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_Reference#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" },
                                { tabName: "Property - Buller", tabindex: 1, layerName: "Property (Buller)", displayFormat: "<B>Location: [#Location#]</B> <br/><br/> Valuation No: [#Valuation_No#] <br/> Legal Description: [#Property_Legal_Description#] <br/> Hectares: [#Hectares#] <br/> Rates: [#Total_Rates_for_This_Year#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/> Improvements Value: [#Improvements_Value#] <br/><br/> <a href='http://public.bullerdc.govt.nz/cgi-bin/rating/rapp?pp&KK1&[#Valuation_No#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a> <br/><br/> <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_No#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" }
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
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


        // --------------------------------------------------------------------------- Tools ---------------------------------------------------------------------------  
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
        displayclearmap: true,
        displaystreetview: true,

        // If set to true, change cookie life cycle below so that the user doesn't see the splashscreen every time they open their browser
        displaysplashscreen: true,
        // If displaysplashscreen set to true, specify cookie life cycle in milliseconds, e.g. 30 days = 2592000000
        cookieLifeCycle: 0,
        // Text to go into the splash screen
        splashscreentitletext: "<H2>WestMaps Terms of Use</H2>",
        splashscreentext: "<br/><p>The attached data is a representation of the approximate location of the items that may be situated on or under the land shown. The information has generally been compiled from data supplied to the West Coast Regional Council and Buller District Council, and must only be used as a guide. To ascertain the exact location of any item, West Coast Regional Council and Buller District Council advise that the customer arrange onsite verification. The data should not be used to identify the legal boundaries of the properties shown.</p>  <p>The West Coast Regional Council and Buller District Council do not warrant the accuracy or completeness of the information represented by the GIS data. To the extent permitted by law, the West Coast Regional Council and Buller District Council, their employees, agents and contractors will not be liable for any costs, damages or loss whatsoever suffered by the customer or any third person caused directly or indirectly by any error in the information represented by the GIS data or in the incorrect use of the information by the customer.</p>  <p>The disclaimer extends to liability of any kind whatsoever including but not limited to the implied warrants of merchantability and fitness for a particular purpose.</p>  <p>Westmaps data must not be sold without prior written consent. For more information please <a href=\"mailto:lg@wcrc.govt.nz,rod@bdc.govt.nz?subject=WestMaps Feedback\">contact us</a>.</p>  <p>Cadastral information derived from the Land Information New Zealand. CROWN COPYRIGHT RESERVED.</p>",

        // Preset bookmarks
        bookmarks_list: [{
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1449947,
                "ymin": 5297683,
                "xmax": 1454710,
                "ymax": 5300858
            },
            "name": "Greymouth"
        }, {
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
                "xmin": 1431825,
                "ymin": 5267028,
                "xmax": 1436587,
                "ymax": 5270203
            },
            "name": "Hokitika"
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
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1280624,
                "ymin": 5132815,
                "xmax": 1283006,
                "ymax": 5134403
            },
            "name": "Haast"
        }],

        // Print configuration
        displayprint: true,
        printedmaptitle: "",
        printedmapauthortext: "", // If in the print service mxd
        printedmapcopyrighttext: "",  // If in the print service mxd
        printquality: [
                        { label: "Low", dpi: "60" },
                        { label: "Med", dpi: "96" },
                        { label: "High", dpi: "200" }
        ],
        printlayouts: [
                        { label: 'A4 Landscape', layout: 'A4 Landscape' },
                        { label: 'A3 Landscape', layout: 'A3 Landscape' },
                        { label: 'A4 Portrait', layout: 'A4 Portrait' },
                        { label: 'A3 Portrait', layout: 'A3 Portrait' },
                        { label: 'Map Only', layout: 'MAP_ONLY' }
        ],
        printformats: [
                        { label: "PDF", value: "PDF" },
                        { label: "JPG", value: "JPG" },
                        { label: "PNG", value: "PNG32" }
        ],
        // To set the scale from the map or not
        printPreserveScale: true,
        printAsync: false,
        printtask: "http://gis.wcrc.govt.nz/arcgis/rest/services/Tools/ExportWebMap/GPServer/Export%20Web%20Map",

        // Report configuration
        displaypropertyreport: true,
        propertyreporttask: "http://gis.wcrc.govt.nz/arcgis/rest/services/Tools/PropertyReport/GPServer/Property%20Report",
        propertyreportMapServiceIdentify:
        {
            id: "Property",
            identifyTask: "http://gis.wcrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer",
            tolerance: 1,
            returnGeometry: true,
            layerIds: [0, 1], // layer ids in map service
            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                { tabName: "Property - West Coast", tabindex: 1, layerName: "Property (West Coast)", displayFormat: "<B>Location: [#Street_Address#], [#Suburb_Town#]</B> <br/><br/> Valuation Reference: [#Valuation_Reference#] <br/> Assessment Number: [#Assessment_Number#] <br/> Legal Description: [#Title#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/><br/> <a href='http://rates.wcrc.netprod.datacomcc.com/wcrc_property_report3.asp?VNZ=[#Valuation_Reference#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a>  <br/><br/>  <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_Reference#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" },
                { tabName: "Property - Buller", tabindex: 1, layerName: "Property (Buller)", displayFormat: "<B>Location: [#Location#]</B> <br/><br/> Valuation No: [#Valuation_No#] <br/> Legal Description: [#Property_Legal_Description#] <br/> Hectares: [#Hectares#] <br/> Rates: [#Total_Rates_for_This_Year#] <br/> Capital Value: [#Capital_Value#] <br/> Land Value: [#Land_Value#] <br/> Improvements Value: [#Improvements_Value#] <br/><br/> <a href='http://public.bullerdc.govt.nz/cgi-bin/rating/rapp?pp&KK1&[#Valuation_No#]' target='_blank' style=\"color:blue\">Detailed Rates Information</a> <br/><br/> <a id='showReport' style=\"color:blue; cursor:pointer\" onclick='generatePropertyReport(&quot;[#Valuation_No#]&quot;);'>View Report</a> <div id='propertyReportLoadBar'></div>" }
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