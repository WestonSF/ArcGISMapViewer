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
define("esri/dijit/geoenrichment/_Interop",["../../declare","esri/Evented"],function(g,h){var c=g("esri.dijit.geoenrichment._Interop",[h],{converters:{},_eventMap:{change:["property","value"],command:["name","arg"]},_onChange:function(a){this.onChange(a,this.getValue(a))},onChange:function(a,b){},_onCommand:function(){this.onCommand.apply(this,arguments)},onCommand:function(){},getValue:function(a){var b=this.converters[a];return b?b.serialize(this.get(a)):this.get(a)},setValue:function(a,b){var e=
this.converters[a];e?this.set(a,e.deserialize(b)):this.set(a,b)}});c.arrayConverter={serialize:function(a){return a.join(",")},deserialize:function(a){return a.split(",")}};c.JsonConverter=function(a){return{serialize:function(b){return b.toJson()},deserialize:function(b){return a(b)}}};c.CtorConverter=function(a){return{serialize:function(b){return b.toJson()},deserialize:function(b){return new a(b)}}};c.RestConverter=function(a){return{serialize:function(b){b=b.toJson();var a=[],d;for(d in b)a.push(d+
"\x3d"+encodeURIComponent(JSON.stringify(b[d])));return a.join("\x26")},deserialize:function(b){b=b.split("\x26");for(var c={},d=0;d<b.length;d++){var f=b[d].indexOf("\x3d");c[b[d].substr(0,f)]=JSON.parse(decodeURIComponent(b[d].substr(f+1)))}return new a(c)}}};c.BoolConverter={serialize:function(a){return a.toString()},deserialize:function(a){return"true"==a}};return c});