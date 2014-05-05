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
define("esri/workers/requestClient","esri/sniff esri/kernel dojo/_base/declare dojo/Deferred dojo/_base/lang esri/workers/ClientBase dojo/_base/xhr".split(" "),function(f,g,e,l,m,h,k){e=new (e([h],{declaredClass:"esri.workers.requestClient",constructor:function(){this.setWorker("esri/workers/requestWorker")},get:function(a){return this._send("GET",a)},post:function(a){return this._send("POST",a)},_send:function(a,c){var b=k._ioSetArgs(c);b.xhr=null;var d=b.ioArgs,e=d.url;delete d.url;delete d.args;
this.postMessage({method:a,url:e,options:d}).then(this._getSuccessHandler(b),this._getErrorHandler(b),this._getProgressHandler(b));return b},_addHeaderFunctions:function(a){a.getResponseHeader=function(c){var b,d=a.headers;Object.keys(d).forEach(function(a){if(a.toLowerCase()==c.toLowerCase())return b=d[a],!1});return b};a.getAllResponseHeaders=function(){var c=[],b=a.headers;Object.keys(b).forEach(function(a){c.push(a+": "+b[a])});return c=c.join("\n")};return a},_getSuccessHandler:function(a){var c=
this,b=a.ioArgs;return function(d){a.xhr=c._addHeaderFunctions(d.data);d=a.xhr.getResponseHeader("content-type");if(("xml"==b.handleAs||-1<d.indexOf("xml"))&&"string"==typeof a.xhr.response)a.xhr.response=(new DOMParser).parseFromString(a.xhr.response,"text/xml");a.resolve(a.xhr.response,a.xhr)}},_getErrorHandler:function(a){return function(c){a.reject(c.data)}},_getProgressHandler:function(a){return function(c){a.progress(c.data)}}}));f("extend-esri")&&(g.requestClient=e);return e});