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
define("esri/tasks/Task","dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has esri/kernel esri/deferredUtils esri/urlUtils esri/Evented".split(" "),function(g,k,l,m,n,p,q,r){g=g(r,{declaredClass:"esri.tasks._Task",_eventMap:{error:["error"],complete:["result"]},constructor:function(a){a&&k.isString(a)&&(this._url=q.urlToObject(this.url=a));this.normalization=!0;this._errorHandler=k.hitch(this,this._errorHandler);this.registerConnectEvents()},_useSSL:function(){var a=this._url,d=/^http:/i;
this.url&&(this.url=this.url.replace(d,"https:"));a&&a.path&&(a.path=a.path.replace(d,"https:"))},_encode:function(a,d,e){var c,b,h={},f,g;for(f in a)if("declaredClass"!==f&&(c=a[f],b=typeof c,null!==c&&void 0!==c&&"function"!==b))if(k.isArray(c)){h[f]=[];g=c.length;for(b=0;b<g;b++)h[f][b]=this._encode(c[b])}else"object"===b?c.toJson&&(b=c.toJson(e&&e[f]),"esri.tasks.FeatureSet"===c.declaredClass&&b.spatialReference&&(b.sr=b.spatialReference,delete b.spatialReference),h[f]=d?b:l.toJson(b)):h[f]=c;
return h},_successHandler:function(a,d,e,c){d&&this[d].apply(this,a);e&&e.apply(null,a);c&&p._resDfd(c,a)},_errorHandler:function(a,d,e){this.onError(a);d&&d(a);e&&e.errback(a)},setNormalization:function(a){this.normalization=a},onError:function(){}});m("extend-esri")&&(n.Task=g);return g});