var configOptions;

function initVariables() {
    configOptions = {
        webTitle: "Clutha District Council Map Viewer", // Title in the web window
        logo: "<img src=\"images/CluthaDClogo.JPG\" height=\"38\" width=\"100\">", // Images for splash screen and bottom left
        searchDefault: "",
        searchTypeAheadURL: "http://103.14.216.134/SpliceMaps/AutocompleteWebService/getdata.ashx",
        // Name needs to be the name of the type ahead search in the stored procedure, searchField needs to be the field to search on
        searchParams: [
                        {
                            name: "address",
                            queryTaskURL: "http://103.14.216.134/arcgis/rest/services/Cadastral/Properties/MapServer/0",
                            returnGeometry: true,
                            searchField: "FullName"
                        },
                        {
                            name: "road",
                            queryTaskURL: "http://103.14.216.134/arcgis/rest/services/Cadastral/Roads/MapServer/2",
                            returnGeometry: true,
                            searchField: "FullName"
                        },
                        {
                            name: "placename",
                            queryTaskURL: "http://103.14.216.134/arcgis/rest/services/Cadastral/Placenames/MapServer/1",
                            returnGeometry: true,
                            searchField: "NAME"
                        },
                        {
                            name: "valuation",
                            queryTaskURL: "http://103.14.216.134/arcgis/rest/services/Cadastral/Properties/MapServer/0",
                            returnGeometry: true,
                            searchField: "VGNumber"
                        }
                      ],
        // Automatically show info Window for these searches
        searchautopopup: ["address", "valuation"],
        // Search zoom buffer - Buffer out the result by the number
        searchZoomLevel: 2,
        // Identify setup - Set the GIS services that are identifiable and what tab they will appear on
        identifyParams: [
                        {
                            name: "Properties",
                            identifyTask: "http://103.14.216.134/arcgis/rest/services/Cadastral/Properties/MapServer",
                            tolerance: 3,
                            returnGeometry: true,
                            layerIds: [0], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_ALL,
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                {tabName: "Property", tabindex: 1, layerName: "Properties", displayFormat: "<B>Address: [#Address#]</B> <br/> Valuation Number: [#VGNumber#] <br/> Legal Description: [#Legal_Description#] <br/><br/> Assessment Area (ha): [#Assessment_Area#] <br/> Land Value: [#Land_Value#] <br/> Capital Value: [#Capital_Value#] <br/> Rates: [#Rates_Struck#] <br/><br/> <a id='showReport' href='#' onclick='generatePropertyReport(&quot;[#VGNumber#]&quot;);'>View Report</a>"} // TODO - onclick not working
                            ]
                        },
                        {
                            name: "Parcels",
                            identifyTask: "http://103.14.216.134/arcgis/rest/services/Cadastral/Parcels/MapServer",
                            tolerance: 3,
                            returnGeometry: false,
                            layerIds: [1], // layer ids in map service
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_ALL,
                            identifyLayerAliases: [ // ids must not contain spaces // name = map service layer name // TODO - tabindex is repeated.  This could be moved into an array where it is not repeated.
                                {tabName: "Parcel", tabindex: 2, layerName: "Parcels", displayFormat: "Legal Description: [#LEGAL#]" }
                            ]
                        },
                        {
                            name: "District Plan",
                            identifyTask: "http://103.14.216.134/arcgis/rest/services/Operational/DistrictPlan/MapServer",
                            tolerance: 3,
                            returnGeometry: false,
                            layerIds: [29],
                            layerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_ALL,
                            identifyLayerAliases: [
                                { tabName: "Resource", tabindex: 3, layerName: "Resource Areas", displayFormat: "<B>Resource: [#RES_ZONING#]</B> <br/> Code: [#RES_CODE#]" }
                            ]
                        }
                        ],
        maxidentifyscale: 250000, // What scale and below will identify be available
        maxstreetviewscale: 50000, // What scale and below will Google street View be available
        displayzoomsliderlabels: true, // Will display labels along side the zoome slider e.g. District, town, property.
        displayfullextent: true,
        displayzoomtoscale: true,
        displaycoordinates: true,
        displayclearselection: true,

        displaysplashscreen: true, // If set to true, change cookie life cycle below so that the user doesn't see the splashscreen every time they open their browser
        cookieLifeCycle: 0, // If displaysplashscreen set to true, specify cookie life cycle in milliseconds, e.g. 30 days = 2592000000
        // Text to go into the splash screen
        splashscreentext: "<h2>Clutha District Council Map Viewer</h2><p>Welcome to Clutha District Council's map viewer. </p><p>The information shown including underground services is indicative only. The Clutha District Council accepts no responsibility for incomplete or inaccurate information contained on this map.</p><p>This publication is copyright reserved by the Clutha District Council. Cadastral information is derived from the LINZ DCDB and is CROWN COPYRIGHT RESERVED.</p>",

        // TODO - These are used for validating querystring parameters but can also be used to restrict extent later if required
        extentBounds: { xmin: 1273000, xmax: 1401000, ymin: 4831000, ymax: 4955000 }, // Not used - max extent

        initialExtent: { xmin: 1273000, xmax: 1401000, ymin: 4831000, ymax: 4955000 }, // First loads 
        fullExtent: { xmin: 1273000, xmax: 1401000, ymin: 4831000, ymax: 4955000 }, // Extent button
        setlods: true, // Set the scales to be used in the application
        lods: [
          {
              "level": 0,
              "resolution": 264.5838625010584,
              "scale": 1000000
          },
          {
              "level": 1,
              "resolution": 132.2919312505292,
              "scale": 500000
          },
          {
              "level": 2,
              "resolution": 66.1459656252646,
              "scale": 250000
          },
          {
              "level": 3,
              "resolution": 33.0729828126323,
              "scale": 125000
          },
          {
              "level": 4,
              "resolution": 19.843789687579378,
              "scale": 75000
          },
          {
              "level": 5,
              "resolution": 13.229193125052918,
              "scale": 50000
          },
          {
              "level": 6,
              "resolution": 5.291677250021167,
              "scale": 20000
          },
          {
              "level": 7,
              "resolution": 2.6458386250105836,
              "scale": 10000
          },
          {
              "level": 8,
              "resolution": 1.3229193125052918,
              "scale": 5000
          },
          {
              "level": 9,
              "resolution": 0.6614596562526459,
              "scale": 2500
          },
          {
              "level": 10,
              "resolution": 0.39687579375158755,
              "scale": 1500
          },
          {
              "level": 11,
              "resolution": 0.26458386250105836,
              "scale": 1000
          },
          {
              "level": 12,
              "resolution": 0.13229193125052918,
              "scale": 500
          }
        ],
        latFieldStrings: ["lat", "latitude", "y", "ycenter"], // acceptable y value column names for importing points via CSV file
        longFieldStrings: ["lon", "long", "longitude", "x", "xcenter"], // acceptable x value column names for importing points via CSV file
        spatialReference: { WKID: 2193, name: "NZTM", xlabel: "X", ylabel: "Y" }, // TODO - the non-WKID parameters are for the measure tool, could use displayFormat parameter instead to be tidy
        wraparound180: false, // true for web mercator only
        initialbasemap: "Streets",
        basemaps: [ // {basemap:new esri.dijit.Basemap({layers:[new esri.dijit.BasemapLayer({url:"....."})],title:".....",thumbnailUrl:"....."})}, // MUST HAVE BRACKETS IN THE RIGHT PLACE (and don't forget no comma on the end of the last one)
                  {name: "Imagery", basemap: new esri.dijit.Basemap({ layers: [new esri.dijit.BasemapLayer({ url: "http://103.14.216.134/arcgis/rest/services/Basemaps/Imagery/MapServer" })], title: "Imagery", thumbnailUrl: "images/Clutha-basemap-imagery.png" }) }, // TODO - drop title parameter and just use name parameter - tidier for administrator
                  {name: "Streets", basemap: new esri.dijit.Basemap({ layers: [new esri.dijit.BasemapLayer({ url: "http://103.14.216.134/arcgis/rest/services/Basemaps/EsriTopo/MapServer" })], title: "Streets", thumbnailUrl: "images/Clutha-basemap-streets.png" }) },
                  { name: "Topographic", basemap: new esri.dijit.Basemap({ layers: [new esri.dijit.BasemapLayer({ url: "http://103.14.216.134/arcgis/rest/services/Basemaps/LINZTopo/MapServer" })], title: "Topographic", thumbnailUrl: "images/Clutha-basemap-topo.png" }) }
                 ],
        uselayerthemes: true, // default = true.  If false, Table of Contents will contain layers from map services.  Themes should be used as the TOC is tidier.
        initiallayertheme: "Property Information",
        layerthemes: [  // name:"......", description:"......"
        //{ name: "All Layers", description: "All Layers in one TOC" },
                        {name: "Property Information", description: "Properties and boundaries" },
                        { name: "Services", description: "Water, stormwater and sewer networks" },
                        { name: "District Plan", description: "Issues affecting resource areas, hazard issues and zoning" }
                 ],
        operationalLayers: [ // {title: ".....", layer: .....}, // showInTOC only used if uselayerthemes == false
                  { theme: "Imagery", title: "Roads", showInTOC: false, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Roads/MapServer", opacity: 0.7, id: 'Roads' },
                  { theme: "Imagery", title: "Addresses", showInTOC: false, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Addresses/MapServer", opacity: 0.7, id: 'Addresses' },
                  { theme: "Imagery", title: "Placenames", showInTOC: false, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Placenames/MapServer", opacity: 0.7, id: 'Placenames' },

                  { theme: "Property Information", title: "Parcels", showInTOC: true, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Parcels/MapServer", opacity: 0.7, id: 'Parcels' },
                  { theme: "Property Information", title: "Boundaries", showInTOC: true, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Boundaries/MapServer", opacity: 0.7, id: 'Boundaries' },

                  { theme: "Services", title: "Parcels", showInTOC: true, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Cadastral/Parcels/MapServer", opacity: 0.7, id: 'Parcels' }, 
                  { theme: "Services", title: "Services", showInTOC: true, noLegend: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Operational/Services/MapServer", opacity: 0.7, id: 'Services' },

                  { theme: "District Plan", title: "District Plan", showInTOC: true, noLegend: false, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Operational/DistrictPlan/MapServer", opacity: 0.7, id: 'District Plan' },

                  { theme: "Admin", title: "Popular Extents", showInTOC: false, noLegend: true, layerType: "esri.layers.ArcGISDynamicMapServiceLayer", url: "http://103.14.216.134/arcgis/rest/services/Tools/PopularExtents/MapServer", opacity: 0.7, id: 'Popular Extents' }
                  ],
        // Layers to include in the export map task
        printmapLegendLayers: ["Services","District Plan","Parcels","Boundaries"],
        // Preset bookmarks
        bookmarks_list: [{
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1346274,
                "ymin": 4872561,
                "xmax": 1351037,
                "ymax": 4875736
            },
            "name": "Balclutha"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1362918,
                "ymin": 4886523,
                "xmax": 1367680,
                "ymax": 4889698
            },
            "name": "Milton"
        }, {
            "extent": {
                "spatialReference": {
                    "wkid": 2193
                },
                "xmin": 1319467,
                "ymin": 4876458,
                "xmax": 1321848,
                "ymax": 4878046
            },
            "name": "Clinton"
        }],

        // Identify and search symbology
        polygonSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([197, 0, 255]), 3, 0.7), new dojo.Color([197, 0, 255, 0])),
        lineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([197, 0, 255]), 6, 0.7),
        markerSymbol: new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([197, 0, 255]), 2), new dojo.Color([197, 0, 255, 0.25])),

        // Measure symbology
        measureLineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 2),
        measureMarkerSymbol: new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 255, 0.25])),
        measurePictureMarkerSymbol: new esri.symbol.PictureMarkerSymbol("images/flag.png", 24, 24),
        measureSymbolOffset: { x: 9, y: 11 },

        // ArcGIS Online config options:     
        //The ID for the map from ArcGIS.com     
        webmap: "", // Not used
        //The id for the web mapping application item that contains configuration info - in most
        //cases this will be null. 
        appid: "", // Not used
        //set to true to display the title
        displaytitle: true, // Not used
        //Enter a title, if no title is specified, the webmap's title is used.
        title: "", // Not used
        //Enter a description for the application. This description will appear in the left pane
        //if no description is entered the webmap description will be used.
        description: "", // Not used
        //specify an owner for the app - used by the print option. The default value will be the web map's owner
        owner: '', // Not used
        //Specify a color theme for the app. Valid options are gray,blue,purple,green and orange
        theme: 'gray', // Not used

        displayslider: true, // Not used
        displaymeasure: true,
        displaybasemaps: true,
        displayoverviewmap: true, // Not used
        displayeditor: false, // Not used
        ////When editing you need to specify a proxyurl (see below) if the service is on a different domain
        //Specify a proxy url if you will be editing, using the elevation profile or have secure services or web maps that are not shared with everyone.
        proxyurl: "/proxy/proxy.ashx",
        alwaysuseproxy: false,
        displayidentify: true,
        displaytoolbar: true,
        displaytools: true,
        displayhelp: false,
        displayadmin: false,
        displaynavigation: true,
        displaylegend: true, // Not used
        displaysearch: true, // Not used
        displaylayerlist: true,
        displaybookmarks: true, // Not used
        displaydetails: true, // Not used
        displaytimeslider: true, // Not used

        //Print options 
        displayprint: true,
        printedmaptitle: "",
        printedmapauthortext: "", // If in the print service mxd
        printedmapcopyrighttext: "",  // If in the print service mxd
        printquality: [ // label: "....", dpi: "..."
                        {label: "Low", dpi: "60" },
                        { label: "Med", dpi: "100" },
                        { label: "High", dpi: "300" }
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
                        { label: "PNG", value: "PNG32" },
                      ],
        printPreserveScale: true,
        // for printing: http://help.arcgis.com/en/webapi/javascript/arcgis/help/jshelp/ags_proxy.htm  
        // need <serverUrl url="http://servicesbeta4.esri.com/arcgis/rest/services/" matchAll="true"></serverUrl> in proxy.ashx
        printtask: "http://103.14.216.134/arcgis/rest/services/Tools/ExportWebMap/GPServer/Export%20Web%20Map",

        // Report configuration
        reporttask: "http://103.14.216.134/arcgis/rest/services/Tools/PropertyReport/GPServer/Property%20Report",
        reportInputParameter: "Valuation_ID",
        reportOutputParameter: "Output_PDF",

        // The elevation tool uses the  measurement tool to draw the lines. So if this is set
        // to true then displaymeasure needs to be true too. 
        displayelevation: false,
        // This option is used when the elevation chart is displayed to control what is displayed when users mouse over or touch the chart. When true, elevation gain/loss will be shown from the first location to the location under the cursor/finger. 
        showelevationdifference: false,
        displayscalebar: true,
        displayshare: true,
        // If enabled enter bitly key and login below.
        // The application allows users to share the map with social networking sites like twitter
        // and facebook. The url for the application can be quite long so shorten it using bit.ly. 
        // You will need to provide your own bitly key and login.
        bitly: {
            key: '',
            login: ''
        },
        // Set to true to display the left panel on startup. The left panel can contain the legend, details and editor. Set to true to 
        // hide left panel on initial startup. 
        leftPanelVisibility: false,
        // If the webmap uses Bing Maps data, you will need to provide your Bing Maps Key
        bingmapskey: "AqaTlFAPkxp8kNn-3aNDg8W5rfpfMFfWdkA5Hgp10m6JoIXRHwGndlVshrWYJ6K1",
        // Modify this to point to your sharing service URL if you are using the portal
        sharingurl: "",
        // Specify a group in ArcGIS.com that contains the basemaps to display in the basemap gallery
        // example: title:'ArcGIS Online Basemaps' , owner:esri
        basemapgroup: {
            title: '',
            owner: ''
        },
        // Specify the url to a geometry service 
        geometryserviceurl: "http://103.14.216.134/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        // Specify the url for a locator service and the single line field name.
        usegeocoder: true,
        placefindersearch: "address", // What search to use geocoder for
        placefinder: {
            "url": "http://103.14.216.134/arcgis/rest/services/Locators/CluthaLocator/GeocodeServer",
            "singlelinefieldname": "SingleLine",
            zoomlevel: 10
        },

        // Level the locate in the mobile app will zoom to
        mobilezoomlevel: 12,

        // Set link text and url parameters if you want to display clickable links in the upper right-corner
        // of the application. 
        // ArcGIS.com. Enter link values for the link1 and link2 and text to add links. For example
        // url:'http://www.esri.com',text:'Esri'
        link1: {
            url: '',
            text: ''
        },
        link2: {
            url: '',
            text: ''
        },
        // Specify the width of the panel that holds the editor, legend, details
        leftpanewidth: 228,
        // Restrict the map's extent to the initial extent of the web map. When true users
        // will not be able to pan/zoom outside the initial extent.
        constrainmapextent: false,
        // Provide an image and url for a logo that will be displayed as a clickable image 
        // in the lower right corner of the map. If nothing is specified then the esri logo will appear.
        // Example customLogoImage: "http://serverapi.arcgisonline.com/jsapi/arcgis/2.4compact/images/map/logo-med.png"
        customlogo: {
            image: '',
            link: ''
        },
        // Wmbed = true means the margins will be collapsed to just include the map no title or links
        embed: false
    };
}