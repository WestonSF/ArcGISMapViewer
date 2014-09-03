# Map Viewer

This map viewer is able to consume web services deployed using ArcGIS for Server technology or ArcGIS Online web maps. The application is built using the ArcGIS API for Javascript as well as Dojo Toolkit and jQuery JavaScript libraries. Current version is 2.1.

* [WestMaps](http://gis.wcrc.govt.nz/WestMaps)
* [NRC Maps](http://gis.nrc.govt.nz/NRCMaps)
* [Clutha District Council Map Viewer](http://203.190.214.189/SpliceMaps)

![Screenshot](/images/KEY/Screenshot.jpg)


## Features

* Search
* Navigation
* Bookmarks
* Layers and Legend
* Print
* Property Report
* Share Map
* Email Map
* Identify
* Help Guide
* My Location
* Closest Facility
* Draw On Map
* Measure
* Google Street View
* Add Shapefile to Map
* Add XY Data to Map



## Libraries Used

* ArcGIS API for Javascript 3.7
* Dojo toolkit 1.8.3
* jQuery Javascript library 1.10.2
* jQuery UI Javascript user interface 1.10.3
* JQuery Mobile 1.3.2


## Content Delivery Networks Used

* http://js.arcgis.com
* http://code.jquery.com


## Browser Support

* Internet Explorer 7+
* Google Chrome 1+
* Mozilla Firefox 1+
* Safari 3+
* Opera 1+


## Installation Instructions

* Install ArcGIS Javascript API on IIS web server
	* Copy the libraries/ArcGISJavascript folder to C:\inetpub\wwwroot
	* Update the placeholders
		* Open C:\Inetpub\wwwroot\ArcGISJavascript\3.7compact\init.js in a text editor and search for the text '[HOSTNAME_AND_PATH_TO_JSAPI]', and replace this text with "'[PUBLICSERVERADDRESS]'/ArcGISJavascript/3.7compact/"
		* Open C:\Inetpub\wwwroot\ArcGISJavascriptAPI\3.7compact\js\dojo\dojo\dojo.js in a text editor and search for the text '[HOSTNAME_AND_PATH_TO_JSAPI]', and replace this text with "'[PUBLICSERVERADDRESS]'/ArcGISJavascript/3.7compact/"
	* Make sure the default document in IIS is set to "init.js" for the 3.7compact directory
	* Update all references in map, gallery, mobile and embed html pages from "js.arcgis.com" to "'[PUBLICSERVERADDRESS]'/ArcGISJavascript" 
* Install proxy on IIS web server
	* Copy the proxy folder to C:\inetpub\wwwroot
	* Convert directory to application in IIS
	* Update the paremter in the configuration file ("proxyurl") to point to the proxy e.g. "'[PUBLICSERVERADDRESS]'/proxy/proxy.ashx"
* Install the AGS map viewer on IIS web server
	* Copy the ArcGISMapViewer folder to C:\inetpub\wwwroot
	* Convert directory to application in IIS


## Requirements

* Notepad or your favorite HTML/JavaScript editor
* Web browser with access to the Internet


## Resources

* [ArcGIS API for Javascript](https://developers.arcgis.com/en/javascript)
* [jQuery](http://jquery.com)
* [jQuery Mobile](http://jquerymobile.com)
* [Dojo Toolkit](http://dojotoolkit.org)


## Issues

Find a bug or want to request a new feature?  Please let me know by submitting an issue.


## Contributing

Anyone and everyone is welcome to contribute. 


## Licensing
Copyright 2014 - Shaun Weston

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


