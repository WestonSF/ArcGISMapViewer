var configOptions;

function initVariables() {
    configOptions = {
        // --------------------------------------------------------------------------- General ---------------------------------------------------------------------------  
        // Title in the web window
        webTitle: "Northland Regional Council Maps",
        // Images for splash screen and bottom right
        logo: "<img src=\"images/logo/NRC_logo.JPG\" height=\"45\" width=\"125\">",

        // ArcGIS Javascript API address
        jsapiaddress: "http://gis.nrc.govt.nz/ArcGISJavascriptAPI/3.7compact",

        // ID from google analytics
        googleanalyticsID: "UA-36942574-1",

        // Specify the url to a geometry service 
        geometryserviceurl: "http://gis.nrc.govt.nz/arcgis/rest/services/Utilities/Geometry/GeometryServer",

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
        proxyurl: "http://gis.nrc.govt.nz/proxy/proxy.ashx",

        // Display help button
        displayhelp: false,
        helpUrl: "",

        // Text to show in error message alert
        errorMessageText: "The following error has occurred, please try again and/or contact gissupport@eagle.co.nz \n\n",

        // Default click mode when application starts e.g. "identify","pan","zoomin","zoomout"
        clickDefault: "identify",

        // Tool to be open when application starts e.g. "none","layers","tools","print"
        onloadTool: "layers",
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Extent & Scales ---------------------------------------------------------------------------  
        // Max extent
        extentBounds: { xmin: 1585000, xmax: 1813000, ymin: 5980000, ymax: 6127000 },
        // First loads
        initialExtent: { xmin: 1585000, xmax: 1813000, ymin: 5980000, ymax: 6127000 },
        // Shapefile extent
        fullExtent: { xmin: 1585000, xmax: 1813000, ymin: 5980000, ymax: 6127000 },

        spatialReference: { WKID: 2193, name: "NZTM", xlabel: "x", ylabel: "y" },
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
              "resolution": 16.933367200067735,
              "scale": 64000
          },
          {
              "level": 6,
              "resolution": 8.466683600033868,
              "scale": 32000
          },
          {
              "level": 7,
              "resolution": 4.233341800016934,
              "scale": 16000
          },
          {
              "level": 8,
              "resolution": 2.116670900008467,
              "scale": 8000
          },
          {
              "level": 9,
              "resolution": 1.0583354500042335,
              "scale": 4000
          },
          {
              "level": 10,
              "resolution": 0.5291677250021167,
              "scale": 2000
          },
          {
              "level": 11,
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
        useAGSOnlineWebMap: true,
        webmapID: "",

        // Gallery portal 
        // The arcgis online group that contains the applications to display
        galleryGroup: {
            owner: "EagleTechnologyNRC",
            title: "Northland Regional Council Public Applications Portal"
        },
        // The url of the portal
        galleryPortalUrl: "http://nrcgis.maps.arcgis.com",

        // Enables the themes dropdown to switch between map configs
        usethemes: true,
        // Initial theme to load
        initialtheme: "Public",
        // List and configure map themes
        themes: [
            {
                theme: "Public", // Name of theme
                webmapID: "8737b6b8573c4395bc7e2baa4888a89e", // ID of web map to use
                initialExtent: {}, // Extent to go to, leave blank to not use
                layergroups: [
                    { name: "Environment", description: "" },
                    { name: "Hazards", description: "" },
                    { name: "Planning", description: "" },
                    { name: "Public Transportation", description: "" },
                    { name: "Boundaries", description: "" }
                ], // Layer groups to include - looks at layerGroups
                initiallayergroup: "Environment", //  Initial layer group to show
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"] // Searches to include - looks at locatorName from searchParams
            },
            {
                theme: "CityLink Bus Service",
                webmapID: "44085684e3ea423d9e009d8a9a6d4c49", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Public Transportation", description: "" },
                    { name: "Boundaries", description: "" }
                ],
                initiallayergroup: "Public Transportation",
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"]
            },
            {
                theme: "Bathing Sites",
                webmapID: "5fc99a5fa7584aa59c380a5f4bba7d5a", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Bathing Sites", description: "" },
                    { name: "Boundaries", description: "" }
                ],
                initiallayergroup: "Bathing Sites",
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"]
            },
            {
                theme: "Civil Defence",
                webmapID: "614b802fd3684f659309bb15f5f0b016", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Hazards", description: "" },
                    { name: "Emergency Services", description: "" }
                ],
                initiallayergroup: "Hazards",
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"]
            },
            {
                theme: "Consultation - Flood Hazards",
                webmapID: "d25d884498e9403998d760b0816a4165", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Flood Hazards", description: "" },
                    { name: "Boundaries", description: "" }
                ],
                initiallayergroup: "Flood Hazards",
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"]
            },
            {
                theme: "Consultation - Regional Policy Statement",
                webmapID: "b6041cc86992405396915d9398824207", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Regional Policy Statement", description: "" },
                    { name: "Boundaries", description: "" }
                ],
                initiallayergroup: "Regional Policy Statement",
                searches: ["Public", "Address", "Road", "Legal", "Parcel", "Bus"]
            },
            {
                theme: "Consultation - Regional Policy Statement (Internal)",
                webmapID: "e6f6e88668d04029834a730a72c67c98", // ID of web map to use
                initialExtent: {},
                layergroups: [
                    { name: "Regional Policy Statement (Internal)", description: "" },
                    { name: "Environment (Internal)", description: "" },
                    { name: "District Plan", description: "" },
                    { name: "Worksmart", description: "" },
                    { name: "Boundaries", description: "" }
                ],
                initiallayergroup: "Regional Policy Statement (Internal)",
                searches: ["Internal", "Address", "Road", "Legal", "Parcel", "Owner", "Assessment", "Bus Route"]
            }
        ],
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Layers ---------------------------------------------------------------------------  
        // The arcgis online group that contains the basemaps to display
        useAGSOnlineBasemaps: true,
        basemapsGroup: {
            owner: "EagleTechnologyNRC",
            title: "Northland Regional Council Basemaps"
        },
        // The url of the portal
        basemapsPortalUrl: "http://nrcgis.maps.arcgis.com",

        initialbasemap: "",
        // Basemaps available for selection
        basemaps: [],

        // If true, displays all map services/layers for each grouping, if false, just shows layer groupings
        displaylayers: true,
        // Display layer mode button
        displayLayerMode: false,
        // Default layer mode - Simple or Advanced
        defaultLayerMode: "Simple",
        // Layer modes - Simple or Advanced
        layerModes: [
                { label: "Simple", value: "simple" },
                { label: "Advanced", value: "advanced" }
        ],
        // Initial layer grouping to show
        initiallayergroup: "Boundaries",
        // The groups and a description for each
        layergroups: [
                        { name: "Environment", description: "" },
                        { name: "Environment (Internal)", description: "" },
                        { name: "Hazards", description: "" },
                        { name: "Planning", description: "" },
                        { name: "Public Transportation", description: "" },
                        { name: "Regional Policy Statement", description: "" },
                        { name: "Regional Policy Statement (Internal)", description: "" },
                        { name: "District Plan", description: "" },
                        { name: "Bathing Sites", description: "" },
                        { name: "Worksmart", description: "" },
                        { name: "Flood Hazards", description: "" },
                        { name: "Emergency Services", description: "" },
                        { name: "Boundaries", description: "" }
        ],
        // Map services to setup and groupings to assign to - id: No spaces and used in code to identify layer, name: Can have any character and will appear to user. If using ArcGIS Online, just need layerGroup, id and optionally name
        operationalLayers: [
                  { layerGroup: "Imagery", id: 'cacheLayer', name: 'Roads', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISTiledMapServiceLayer", url: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer" },
                  { layerGroup: "Imagery", id: 'cacheLayer2', name: 'Addresses', visible: true, opacity: 0.7, layerList: false, legend: false, printLegend: false, secure: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer" },


                  { layerGroup: "Environment", id: 'WaterPublic', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment", id: 'CoastPublic', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment", id: 'BiodiversityPublic', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment", id: 'Biosecurity', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment", id: 'Community', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment", id: 'Consents', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Environment (Internal)", id: 'WaterInternal', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment (Internal)", id: 'CoastInternal', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment (Internal)", id: 'BiodiversityInternal', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Environment (Internal)", id: 'Land', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Hazards", id: 'CoastalHazards', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Hazards", id: 'LandHazards', layerList: true, legend: true, printLegend: true, secure: false },
		          { layerGroup: "Hazards", id: 'TsunamiHazards', layerList: true, legend: true, printLegend: false, secure: false },

                  { layerGroup: "Planning", id: 'CoastalPlanning', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Planning", id: 'WaterSoil', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Planning", id: 'AirQuality', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Public Transportation", id: 'BusRoutes', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Public Transportation", id: 'BusStops', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Regional Policy Statement", id: 'RegionalPolicyStatementPublic', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Regional Policy Statement (Internal)", id: 'RegionalPolicyStatementInternal', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Regional Policy Statement (Internal)", id: 'RegionalPolicyStatementSubmissions', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "District Plan", id: 'DistrictPlanFNDC', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "District Plan", id: 'DistrictPlanWDC', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "District Plan", id: 'DistrictPlanKDC', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Bathing Sites", id: 'BathingSites', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Worksmart", id: 'Worksmart', layerList: true, legend: true, printLegend: true, secure: false },

		          { layerGroup: "Emergency Services", id: 'EmergencyServices', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Boundaries", id: 'Boundaries', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Boundaries", id: 'Wards', layerList: true, legend: true, printLegend: true, secure: false },

                  { layerGroup: "Environment,Environment (Internal),Planning,Regional Policy Statement,Regional Policy Statement (Internal),District Plan,Worksmart,Flood Hazards", id: 'Parcels', layerList: true, legend: true, printLegend: false, secure: false },

                  { layerGroup: "Environment (Internal),Regional Policy Statement (Internal),District Plan,Worksmart", id: 'Property', layerList: true, legend: true, printLegend: true, secure: true },

                  { layerGroup: "Hazards,Flood Hazards", id: 'FloodHazards10Year', layerList: true, legend: true, printLegend: true, secure: false },
                  { layerGroup: "Hazards,Flood Hazards", id: 'FloodHazards100Year', layerList: true, legend: true, printLegend: true, secure: false }
        ],
        // Secure service login message
        secureserviceloginmessage: "<B>This area of the site is only available to Northland Regional Council staff. Contact the NRC GIS Administrator for login credentials.</B> <br\><br\>Server - ${server} <br\>Service - ${resource}",
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Searches ---------------------------------------------------------------------------  
        // Specify the locators and query task to use for searching
        searchParams: [
            {
                url: "http://utility.arcgis.com/usrsvcs/servers/375cd892fb2c42b681ce4c2a52a09eba/rest/services/Locators/NorthlandInternalLocator/GeocodeServer",
                name: "All",
                outFields: "*",
                locatorName: "Internal",
                singleLineFieldName: "SingleLine"
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/NorthlandPublicLocator/GeocodeServer",
                name: "All",
                outFields: "*",
                locatorName: "Public",
                singleLineFieldName: "SingleLine"
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/AddressLocator/GeocodeServer", // URL of locator service
                name: "Address", // Name of locator to appear in searches dropdown
                locatorName: "Address", // Name of locator in composite locator
                singleLineFieldName: "Single Line Input", // Name of field in locator for single line search
                queryTaskURL: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Addresses/MapServer/0", // URL of map service to search after locator
                searchField: "FULLADD" // Name of field to search in map service
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/RoadLocator/GeocodeServer",
                name: "Road",
                locatorName: "Road",
                singleLineFieldName: "SingleLineCityName",
                queryTaskURL: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/Roads/MapServer/2",
                searchField: "FULLNAME"
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/LegalDescriptionLocator/GeocodeServer",
                name: "Legal Description",
                locatorName: "Legal",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer/1",
                searchField: "LABEL"
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/ParcelLocator/GeocodeServer",
                name: "Parcel ID",
                locatorName: "Parcel",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer/0",
                searchField: "PAR_ID"
            },
            {
                url: "http://utility.arcgis.com/usrsvcs/servers/0e6166e276304eeda9501885fad49e5a/rest/services/Locators/OwnerNameLocator/GeocodeServer",
                name: "Owner Name",
                locatorName: "Owner",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://utility.arcgis.com/usrsvcs/servers/44b4784af9104263acc294d15a2d6b05/rest/services/PropertyAndBoundaries/Property/MapServer/0",
                searchField: "OWNERNAME"
            },
            {
                url: "http://utility.arcgis.com/usrsvcs/servers/027c0ce273cd4e9c9254e3d983d2a640/rest/services/Locators/AssessmentLocator/GeocodeServer",
                name: "Assessment ID",
                locatorName: "Assessment",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://utility.arcgis.com/usrsvcs/servers/44b4784af9104263acc294d15a2d6b05/rest/services/PropertyAndBoundaries/Property/MapServer/0",
                searchField: "ASSESSMENT"
            },
            {
                url: "http://gis.nrc.govt.nz/arcgis/rest/services/Locators/BusRouteLocator/GeocodeServer",
                name: "Bus Route",
                locatorName: "Bus",
                singleLineFieldName: "Single Line Input",
                queryTaskURL: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/BusRoutes/MapServer/0",
                searchField: "ROUTE"
            }
        ],
        // Default search text on startup
        searchDefault: "",
        // Automatically show info Window for these layers
        searchautopopup: [""],
        // Search zoom buffer - Buffer out the result by the number
        searchZoomBuffer: 5,
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  


        // --------------------------------------------------------------------------- Identify ---------------------------------------------------------------------------  
        // Identify setup the GIS services that are identifiable and what tab they will appear on - id from operational layers
        identifyParams: [
                        // Boundaries
                        {
                            id: "Wards",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Wards/MapServer",
                            tolerance: 5,
                            returnGeometry: false,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Ward", tabindex: 1, layerName: "Wards", displayFormat: "<I><font size=\"1\">Ward arrangements for the election of councillors to the Northland Regional Council  for the local body elections October 2013</font></I> <br/><br/> <B>Ward: [#Ward#]</B> <br/><br/> Population: [#Pop2011_MB#] <br/> [#Councillor#] " }
                            ]
                        },


                        // Property
                        {
                            id: "Parcels",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Parcels/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Parcel", tabindex: 2, layerName: "Parcel", displayFormat: "<B>Parcel ID: [#par_id#]</B>" }
                            ]
                        },
                        {
                            id: "Property",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/44b4784af9104263acc294d15a2d6b05/rest/services/PropertyAndBoundaries/Property/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Property", tabindex: 1, layerName: "Property", displayFormat: "<B>Address: [#ADDRESS#]</B> <br/><br/> Legal Description: [#LEGAL#] <br/> Assessment ID: [#ASSESSMENT#] <br/> Owner: [#OWNERNAME#] <br/><br/> Capital Value: [#CAPITAL#] <br/> Land Value: [#LAND#]" }
                            ]
                        },


                        // Environment
                        {
                            id: "Consents",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Operational/Consents/MapServer",
                            tolerance: 10,
                            returnGeometry: false,
                            layerIds: [0, 1, 2], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Application", tabindex: 1, layerName: "Applications", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Type: [#ApplicationType#] <br/> Status: [#CurrentStatus#]" },
                                { tabName: "Authorisation", tabindex: 2, layerName: "Authorisations", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Authorisation Type: [#AuthorisationType#] <br/> Activity Type: [#ActivityType#] <br/> Activity Sub Type: [#ActivitySubType#] <br/> Status: [#CurrentStatus#]" },
                                { tabName: "Permitted Activity", tabindex: 2, layerName: "Permitted Activity", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Authorisation Type: [#AuthorisationType#] <br/> Activity Type: [#ActivityType#] <br/> Activity Sub Type: [#ActivitySubType#] <br/> Status: [#CurrentStatus#]" }
                            ]
                        },
                        {
                            id: "Biosecurity",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Environment/Biosecurity/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Pest Plant", tabindex: 1, layerName: "Pest Plants", displayFormat: "<B>Worksmart Number: [#WSNUMBER#] <br/> Type: [#Type#]</B> <br/> Subtype: [#Subtype#] <br/> Status: [#Status#]" }
                            ]
                        },
                        {
                            id: "BiodiversityPublic",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Environment/BiodiversityPublic/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Biodiversity Wetland", tabindex: 1, layerName: "Biodiversity Wetlands", displayFormat: "<B>Worksmart Number: [#WSNUMBER#] <br/> Area: [#Area#]</B> <br/> Subtype: [#Subtype#]" }
                            ]
                        },
                        {
                            id: "Community",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Operational/Community/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1, 2], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Grant Application", tabindex: 1, layerName: "Grant Application", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Type: [#ApplicationType#] <br/> Status: [#CurrentStatus#]" },
                                { tabName: "School", tabindex: 1, layerName: "Schools", displayFormat: "<B>School: [#School Name#]</B> <br/> Type: [#Group#] <br/> Address: [#Physical Address#] <br/> Phone: [#Phone#] <br/><br/> <font size=\"1\"><a href=\"[#Website#]\"  style=\"color:blue\" target=\"_blank\">Website</a></font>" },
                                { tabName: "Organic Farm", tabindex: 1, layerName: "Organic Farms", displayFormat: "<B>Certification Number: [#CERTNO#] <br/> Type: [#TYPEA#]</B> <br/> Company: [#COMPANY#]" }
                            ]
                        },
                        {
                            id: "WaterPublic",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Environment/WaterPublic/MapServer",
                            tolerance: 10,
                            returnGeometry: false,
                            layerIds: [0, 1, 2, 3, 4, 5], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Freshwater Swimming Water Quality 2013 to 2014 Season Median", tabindex: 1, layerName: "Freshwater Swimming Water Quality 2013/2014 Season Median", displayFormat: "<B>Site Number: [#SiteNo#] <br/>Description: [#SiteName#]</B>  <br/><br/> End of Season Median: Escherichia Coli count is [#EOS_Median#]/100ml <br/> Compliance with MfE Guidelines: [#compliance#] <br/> Grade: [#MfE_grade#]" },
                                { tabName: "Freshwater Swimming Water Quality 2010 to 2011 Season Median", tabindex: 2, layerName: "Freshwater Swimming Water Quality 2010/2011 Season Median", displayFormat: "<B>Site Number: [#Site Number#] <br/>Description: [#Site Desc#]</B>  <br/><br/> End of Season Median: Escherichia Coli count is [#Value#]/100ml <br/> Grade: [#Grade#]" },
                                { tabName: "Water Quality Monitoring", tabindex: 1, layerName: "State of the Environment Water Quality Monitoring", displayFormat: "<B>Site Name: [#Site Name#]</B> <br/> <B>Site Number: [#Site_number#]</B>  <br/><br/> Date Sampled: [#Date_measured#] <br/> Chlorophyll (a g/m3): [#Chlorophyll_a_g_m3#] <br/> Water Depth (m): [#Water_depth_m#] <br/> Dissolved Oxygen (g/m3): [#Dissolved_oxygen_g_m3#] <br/> Dissolved Oxygen (Saturation): [#Dissolved_oxygen____Saturation#] <br/> Dissolved Reactive Phosphorus (g/m3-P): [#Dissolved_reactive_phosphorus_g_m3_P#] <br/> Enterococci (MPN/100ml): [#Enterococci_MPN_100ml#] <br/> Faecal Coliforms (CFU/100ml): [#Faecal_coliforms_CFU_100ml#] <br/> Ammonium (NH4) (g/m3-N): [#Ammonium__NH4__g_m3_N#] <br/> Oxidised Nitrogen (NNN) (g/m3-N): [#Oxidised_nitrogen__NNN__g_m3_N#] <br/> Nitrite (NO2) (g/m3-N): [#Nitrite__NO2__g_m3_N#] <br/> Nitrate (NO3) (g/m3-N): [#Nitrate__NO3__g_m3_N#] <br/> Salinity (ppt): [#Salinity_ppt#] <br/> Secchi Disk (m): [#Secchi_disk_m#] <br/> Suspended Solids (g/m3): [#Suspended_solids_g_m3#] <br/> Temperature (Degree Centigrade): [#Temperature_degree_centigrade#] <br/> Total Kjeldahl Nitrogen  (g/m3): [#Total_Kjeldahl_nitrogen__g_m3#] <br/> Total Nitrogen (g/m3-N): [#Total_nitrogen_g_m3_N#] <br/> Total Phosphorus (g/m3-P): [#Total_phosphorus_g_m3_P#] <br/> Turbidity (NTU): [#Turbidity_NTU#]" },
                                { tabName: "Bore", tabindex: 1, layerName: "Bores", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Type: [#LocationActivityType#]" },
                                { tabName: "River Catchment", tabindex: 1, layerName: "River Catchments", displayFormat: "<B>Catchment: [#CATCH_NAME#] <br/> Area: [#AREA_KM2#] km2</B>" },
                                { tabName: "Main Northland Aquifer", tabindex: 1, layerName: "Main Northland Aquifers", displayFormat: "<B>Name: [#NAME#] <br/> Type: [#TYPE#]</B> <br/> Area: [#Area_ha#] ha" }
                            ]
                        },
                        {
                            id: "CoastPublic",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Environment/CoastPublic/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1, 2, 3, 4], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Beach Swimming Water Quality 2013 to 2014 Season Median", tabindex: 1, layerName: "Beach Swimming Water Quality 2013/2014 Season Median", displayFormat: "<B>Site Number: [#SiteNo#] <br/>Description: [#SiteName#]</B>  <br/><br/> End of Season Median: Enterococci count is [#EOS_Median#]/100ml <br/> Compliance with MfE Guidelines: [#compliance#] <br/> Grade: [#MfE_grade#]" },
                                { tabName: "Beach Swimming Water Quality 2010 to 2011 Season Median", tabindex: 2, layerName: "Beach Swimming Water Quality 2010/2011 Season Median", displayFormat: "<B>Site Number: [#Site Number#] <br/>Description: [#Site Desc#]</B>  <br/><br/> End of Season Median: Enterococci count is [#Value#]/100ml <br/> Grade: [#Grade#]" },
                                { tabName: "Estuary Monitoring", tabindex: 1, layerName: "State of the Environment Estuary Monitoring", displayFormat: "<B>Site Number: [#Site_number#] </B><br/><br/> Date Sampled: [#Date_sampled#] <br/> Mud (<63um): [#mud___63um_#] <br/> Total Nitrogen: [#Total_nitrogen__#] <br/> Total Phosphorus (mg/kg): [#Total_phosphorus_mg_kg#] <br/> Ashe Free Dry Weight (mg/sample): [#Ashe_free_dry_weight_mg_sample#] <br/> Total Cadmium (mg/kg): [#Total_cadmium_mg_kg#] <br/> Total Chromium (mg/kg): [#Total_chromium_mg_kg#] <br/> Total Copper (mg/kg): [#Total_copper_mg_kg#] <br/> Total Nickel (mg/kg): [#Total_nickel_mg_kg#] <br/> Total Lead (mg/kg): [#Total_lead_mg_kg#] <br/> Total Zinc (mg/kg): [#Total_zinc_mg_kg#]" },
                                { tabName: "Mooring", tabindex: 1, layerName: "Moorings", displayFormat: "<B>ID: [#IRISID#]</B> <br/><br/> Status: [#CurrentStatus#]" },
                                { tabName: "Marine Farm", tabindex: 1, layerName: "Northland Marine Farms", displayFormat: "<B>ET ID: [#ET_ID#] <br/> Location: [#LOCATION#]</B> <br/> Core Number: [#CORE_NUM#] <br/> Lease Number: [#LEASE_NUM#] <br/> Lot Number: [#LOT_NUM#]" }
                            ]
                        },


                        // Environment (Internal)
                        {
                            id: "WaterInternal",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/a5b3c0bc2acc47f88191d7e20331aba2/rest/services/Environment/WaterInternal/MapServer",
                            tolerance: 10,
                            returnGeometry: false,
                            layerIds: [2, 3, 6], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Water Catchment", tabindex: 1, layerName: "Surface Water Catchments", displayFormat: "<B>Catchment: [#CATCH_NAME#] <br/> Area: [#AREA_KM2#] km2</B>" },
                                { tabName: "Main Northland Aquifer", tabindex: 1, layerName: "Main Northland Aquifers", displayFormat: "<B>Name: [#NAME#] <br/> Type: [#TYPE#]</B> <br/> Area: [#Area_ha#] ha" },
                                { tabName: "At Risk Aquifer", tabindex: 1, layerName: "At Risk Aquifers", displayFormat: "<B>Name: [#NAME#] <br/> Type: [#TYPE#]</B>" }
                            ]
                        },
                        {
                            id: "Land",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/c233d036c22c434cb3740f47b8c177ff/rest/services/Environment/Land/MapServer",
                            tolerance: 10,
                            returnGeometry: false,
                            layerIds: [0, 1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Historic Place", tabindex: 1, layerName: "NZHPT Historic Places", displayFormat: "<B>Name: [#Name#] <br/> Location: [#Location#]</B> <br/><br/> Former Use: [#Former_Use#] <br/> Current Use: [#Current_Us#]" },
                                { tabName: "Archaeological Site", tabindex: 1, layerName: "Archaeological Sites", displayFormat: "<B>Name: [#NAME#] <br/> Description: [#DESCRIPTIO#]</B> <br/><br/> Site Period: [#SitePeriod#]" }
                            ]
                        },


                        // Hazards
                        {
                            id: "LandHazards",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Hazards/LandHazards/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1, 2], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Flood Susceptible Land", tabindex: 1, layerName: "Flood Susceptible Land", displayFormat: "<B>Flood Susceptibility: [#FLOOD_SUSC#] </B>" },
                                { tabName: "Catchments - Priority River", tabindex: 1, layerName: "Catchments - Priority Rivers ", displayFormat: "<B>Priority Catchment: [#PriorityCa#] <br/> Sub Catchment: [#NRC_SubCat#]</B> <br/> Area: [#Area_sqkm#] sq km" },
                                { tabName: "Erosion Prone Land", tabindex: 1, layerName: "Erosion Prone Land", displayFormat: "<B>Soil Type: [#MAINSOIL#] </B> <br/><br/> Slope: [#SLOPE#] <br/> Erosion: [#EROSION#]" },
                                { tabName: "Selected Land Use Site", tabindex: 1, layerName: "Selected Land Use Sites", displayFormat: "<B>ID: [#IRISID#] </B>" }
                            ]
                        },



                        // Planning
                        {
                            id: "WaterSoil",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Planning/WaterAndSoil/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0, 1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Outstanding Value River", tabindex: 1, layerName: "Outstanding Value Rivers", displayFormat: "<B>Name: [#NAME#]" },
                                { tabName: "Aquifer", tabindex: 1, layerName: "At Risk Aquifers of Northland", displayFormat: "<B>Name: [#NAME#] <br/> Type: [#TYPE#]</B> <br/> Plan Schedule: [#PLAN_SCH#]" }
                            ]
                        },
                        {
                            id: "CoastalPlanning",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Planning/CoastalPlanning/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Marine Management Area", tabindex: 1, layerName: "Marine Management Areas", displayFormat: "<B>Description: [#DESC_#] </B> <br/>Class: [#MM_CLASS#]" }
                            ]
                        },
                        {
                            id: "AirQuality",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Planning/AirQuality/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Air Quality", tabindex: 1, layerName: "Air Quality - Airsheds", displayFormat: "<B>Airshed Name: [#AirShed_Na#] <br/> ID: [#Id#]</B>" }
                            ]
                        },


                        // Public Transportation
                        {
                            id: "BusRoutes",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/BusRoutes/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Bus Route", tabindex: 1, layerName: "Bus Route", displayFormat: "<B>Bus Route: [#ROUTE#]</B> <br/> Company: [#Company#] <br/><br/> <font size=\"1\"><a href=\"[#Timetable#]\"  style=\"color:blue\" target=\"_blank\">Timetable</a></font>" }
                            ]
                        },
                        {
                            id: "BusStops",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/BusStops/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Bus Stop", tabindex: 2, layerName: "Bus Stop", displayFormat: "<B>Bus Stop: [#Address#]</B> <br/> <B>[#BusStop#]</B> <br/><br/> Bus Route: [#Route#] <br/> Company: [#Company#] <br/><br/> <font size=\"1\"><a href=\"[#Timetable#]\"  style=\"color:blue\" target=\"_blank\">Timetable</a></font>" }
                            ]
                        },


                        // Bathing Sites
                        {
                            id: "BathingSites",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Environment/BathingSites/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1, 2, 3], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE,
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Beach Swimming Water Quality 2013 to 2014 Season Median", tabindex: 2, layerName: "Beach Swimming Water Quality 2013/2014 Season Median", displayFormat: "<B>Site Number: [#SiteNo#] <br/>Description: [#SiteName#]</B>  <br/><br/> End of Season Median: Enterococci count is [#EOS_Median#]/100ml <br/> Compliance with MfE Guidelines: [#compliance#] <br/> Grade: [#MfE_grade#]" },
                                { tabName: "Freshwater Swimming Water Quality 2013 to 2014 Season Median", tabindex: 2, layerName: "Freshwater Swimming Water Quality 2013/2014 Season Median", displayFormat: "<B>Site Number: [#SiteNo#] <br/>Description: [#SiteName#]</B>  <br/><br/> End of Season Median: Escherichia Coli count is [#EOS_Median#]/100ml <br/> Compliance with MfE Guidelines: [#compliance#] <br/> Grade: [#MfE_grade#]" },
                            ]
                        },


                        // Regional Policy Statement
                        {
                            id: "RegionalPolicyStatementPublic",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/Planning/RegionalPolicyStatementPublic/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0, 2], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Outstanding Natural Landscape", tabindex: 1, layerName: "Outstanding Natural Landscape", displayFormat: "<B>Name: [#LandscapeN#]</B>" },
                                { tabName: "Outstanding Natural Feature", tabindex: 1, layerName: "Outstanding Natural Feature", displayFormat: "<B>Name: [#ONFS#]</B>" }
                            ]
                        },


                        // Regional Policy Statement (Internal)
                        {
                            id: "RegionalPolicyStatementInternal",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/37da0a116a1043f8b73923a8ac565f81/rest/services/Planning/RegionalPolicyStatementInternal/MapServer",
                            tolerance: 5,
                            returnGeometry: true,
                            layerIds: [0, 1, 6, 8], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Draft RPS - Outstanding Natural Landscape", tabindex: 2, layerName: "Draft RPS - Outstanding Natural Landscape", displayFormat: "<B>Name: [#ONL#]</B>" },
                                { tabName: "Draft RPS - Outstanding Natural Feature", tabindex: 2, layerName: "Draft RPS - Outstanding Natural Feature", displayFormat: "<B>Name: [#ONFS#]</B>" },
                                { tabName: "Proposed RPS - Outstanding Natural Landscape", tabindex: 1, layerName: "Proposed RPS - Outstanding Natural Landscape", displayFormat: "<B>Name: [#LandscapeN#]</B>" },
                                { tabName: "Proposed RPS - Outstanding Natural Feature", tabindex: 1, layerName: "Proposed RPS - Outstanding Natural Feature", displayFormat: "<B>Name: [#ONFS#]</B>" }
                            ]
                        },
                        {
                            id: "RegionalPolicyStatementSubmissions",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/0755e44f22c54ee5b215ed2c6af59ab6/rest/services/Planning/RegionalPolicyStatementSubmissions/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0, 1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Submission", tabindex: 1, layerName: "Submission", displayFormat: "<B>Submission: [#Submission#] <br/> Layer: [#Layer#]</B> <br/> Recommendation: [#Recommendation#]" },
                                { tabName: "Recommended Change", tabindex: 2, layerName: "Recommended Change", displayFormat: "<B>Submission: [#Submission#] <br/> Layer: [#Layer#]</B> <br/> Recommendation: [#Recommendation#]" }
                            ]
                        },

                        // Worksmart
                        {
                            id: "Worksmart",
                            identifyTask: "http://utility.arcgis.com/usrsvcs/servers/dfb5199e1ca9479babbefceff5a9988a/rest/services/Operational/Worksmart/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Persons or Place of Interest", tabindex: 1, layerName: "Persons and Places of Interest", displayFormat: "<B>Worksmart Number: [#WS_NUMBER#]</B> <br/><br/> Group: [#GRP_CODE#] <br/> Description: [#SUBT_DESC#] <br/> Status: [#STAT_DESC#]" }
                            ]
                        },

                        // Emergency Services
                        {
                            id: "EmergencyServices",
                            identifyTask: "http://gis.nrc.govt.nz/arcgis/rest/services/CivilDefence/EmergencyServices/MapServer",
                            tolerance: 10,
                            returnGeometry: true,
                            layerIds: [0,1,2,3,4,5], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE, // LAYER_OPTION_VISIBLE, LAYER_OPTION_TOP or LAYER_OPTION_ALL
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                { tabName: "Ambulance Station", tabindex: 1, layerName: "Ambulance Stations", displayFormat: "<B>Site: [#Site#] </B> <br/><br/> Address: [#StreetAddress#]" },
                                { tabName: "Civil Defence Welfare Centre", tabindex: 1, layerName: "Civil Defence Welfare Centres", displayFormat: "<B>Welfare Centre: [#WelfareCentre#] </B> <br/><br/> Location: [#Location#] <br/> Status: [#Status#] <br/> <font size=\"2\"><a href=\"[#StreetView#]\"  style=\"color:blue\" target=\"_blank\">Google StreetView</a></font> <br/><br/> Coordinator: [#Co_ordinator#] <br/>Welfare Centre Contact: [#To_Open_as_a_Welfare_Centre_Contact#] <br/> Centre Phone Number: [#Centre_Phone_Number#] <br><br/> Accommodation Facilities: [#Accommodation_Facilities#] <br/> Catering Facilities: [#Catering_Facilities#] <br/> Toilet Facilities: [#Toilet_Facilities#] <br/> Parking: [#Parking#] <br/> Building Capacity: [#Building_Capacity#] <br/><br/> Notes: [#Notes#]" },
                                { tabName: "Community Response Plan", tabindex: 1, layerName: "Community Response Plans", displayFormat: "<B>Name: [#NAME#] </B> <br/><br/> <font size=\"2\"><a href=\"[#URL#]\"  style=\"color:blue\" target=\"_blank\">View Plan</a></font>" },
                                { tabName: "Fire Station", tabindex: 1, layerName: "Fire Stations", displayFormat: "<B>Site: [#Site#] </B> <br/><br/> Address: [#StreetAddress#]" },
                                { tabName: "Hospital", tabindex: 1, layerName: "Hospitals", displayFormat: "<B>Site: [#Site#] </B> <br/><br/> Address: [#StreetAddress#]" },
                                { tabName: "Police Station", tabindex: 1, layerName: "Police Stations", displayFormat: "<B>Site: [#Site#] </B> <br/><br/> Address: [#StreetAddress#]" }
                            ]
                        }
        ],
        // The size of the popup window
        infowWindowSize: [360, 280],
        // What scale and below will identify be available
        maxidentifyscale: 2000000,
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
        splashscreentitletext: "<H2>Northland Regional Council (NRC)<br/> Online Maps Terms of Use</H2>",
        splashscreentext: "<p align=\"justify\"><B>License to Use</B><br/>Northland Regional Council (NRC) makes the NRC Online Maps Service available for use on a Creative Commons Attribution 3.0 New Zealand (CC BY 3.0) licence. These terms of use apply to all users of the \"NRC Online Maps\" service or any part of it (Service). If you use the Service, it will be assumed that you have agreed to these terms, without qualification. If you do not agree to be bound by these terms of use, please do not use the Service.</p>        <p align=\"justify\"><B>Intellectual Property</B><br/>NRC owns or is authorised to use the copyright, trademarks and all other intellectual property rights (IP Rights) in the maps, information, software, text, graphics and other material (Content) displayed or available through the Service. NRC acknowledges the Service is provided from Splice Group Ltd hosted environment using licensed technology from Environmental Systems Research Institute (ESRI) and SpliceMaps.</p>        <p align=\"justify\"><B>NRC also acknowledges that;</B> <br/>- The map services contain layers sourced from Land Information New Zealand data. Crown Copyright Reserved. <br/>- The layers \"River Catchments\" and \"Priority Rivers Catchments\" are partially derived from the NIWA River Environments Classification dataset. <br/>- The layers \"Erosion Prone Land\" and \"Flood Susceptible Land\" are derived from the Fundamental Soils Layer and the NZLRI boundaries respectively from Landcare Research Ltd.</p>       <p align=\"justify\"><B>Liability</B> <br/>NRC will not be liable for the use you make chose to make of the Service. You will indemnify and hold NRC harmless from any and all claims relating to your use of the Service or use of them by any person on your behalf.</p>      <p align=\"justify\"><B>Information</B> <br/>NRC will not be responsible for the availability, accuracy, completeness, currency or reliability of the information or maps made available via the Service. Any decision that you make after using the Service must be based solely on your own evaluation of the information available to you, your circumstances and objectives. To the extent that liability cannot, by law, be disclaimed, by using the Service you agree to limit NRC's liability in contract, tort or otherwise at law to the sum of one dollar ($1.00).</p>",

        // Preset bookmarks
        bookmarks_list: [{
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1712691,
                "ymin": 6043816,
                "xmax": 1724597,
                "ymax": 6051753
            },
            "name": "Whangarei"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1621409,
                "ymin": 6113017,
                "xmax": 1626172,
                "ymax": 6116192
            },
            "name": "Kaitaia"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1671186,
                "ymin": 6080795,
                "xmax": 1673567,
                "ymax": 6082383
            },
            "name": "Kaikohe"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1675771,
                "ymin": 6021401,
                "xmax": 1680534,
                "ymax": 6024576
            },
            "name": "Dargaville"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1698107,
                "ymin": 6094226,
                "xmax": 1700489,
                "ymax": 6095813
            },
            "name": "Paihia"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1735258,
                "ymin": 6062429,
                "xmax": 1737640,
                "ymax": 6064016
            },
            "name": "Matapouri"
        }],

        // Print configuration
        displayprint: true,
        printedmaptitle: "",
        printedmapauthortext: "", // If in the print service mxd
        printedmapcopyrighttext: "",  // If in the print service mxd
        printquality: [ // label: "....", dpi: "..."
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
        printtask: "http://gis.nrc.govt.nz/arcgis/rest/services/Tools/ExportWebMap/GPServer/Export%20Web%20Map",

        // Report configuration
        displaypropertyreport: false,
        propertyreporttask: "",
        propertyreportMapServiceIdentify: {},
        propertyreportinputParameter: "",
        propertyreportoutputParameter: "",
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

        // Closest facility configuration
        displayClosestFacility: true,
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
            url: "http://logistics.arcgis.com/arcgis/rest/services/World/ClosestFacility/GPServer/FindClosestFacilities",
            secure: true,
            tokenURL: "https://www.arcgis.com/sharing",
            // Username/password for ArcGIS Online - Needs to be an organisation account to have access to the network services
            username: "EagleTechnologyNRC",
            password: "*****"
        },
        // Map service with features to be setup as facilities.
        facilitiesURL: "http://gis.nrc.govt.nz/arcgis/rest/services/Transportation/BusStops/MapServer/0",
        facilityName: "Bus Stop (Whangarei)"
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
    };
}
