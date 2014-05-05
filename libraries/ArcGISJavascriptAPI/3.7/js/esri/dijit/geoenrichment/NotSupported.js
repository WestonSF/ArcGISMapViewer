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
define("esri/dijit/geoenrichment/NotSupported",["dojo/dom-construct"],function(a){return{placeAt:function(b){a.create("div",{"class":"NotSupported_Message",innerHTML:"Your browser is not supported. Please upgrade to Internet Explorer 8 or higher."},b)}}});