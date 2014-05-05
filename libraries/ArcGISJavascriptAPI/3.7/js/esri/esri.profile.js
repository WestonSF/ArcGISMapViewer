/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
var profile=function(){var d=/^esri\/tests\//,e=/\.js$/i,f=/^esri\/arcgisonline\//i,g=/^esri\/mobile\//i,h=/^esri\/discovery\//i,c=function(b,a){return a in{"esri/package.json":1,"esri/esri.profile.js":1,"esri/esri.js":1,"esri/workers/requestWorker":1}},k={"esri/arcgisonline":1,"esri/base":1,"esri/gallery":1,"esri/mobile":1,"esri/arcgismanager":1};return{resourceTags:{test:function(b,a){return d.test(a)||-1!==a.search(/\.17$/)},copyOnly:function(b,a){return c(b,a)},amd:function(b,a){return e.test(b)&&
!c(b,a)&&(/^esri\/arcgisonline\/sharing\/dijit\/FeatureLayerQueryResult/i.test(a)||!(a in k||f.test(a)||g.test(a)||h.test(a)))}}}}();