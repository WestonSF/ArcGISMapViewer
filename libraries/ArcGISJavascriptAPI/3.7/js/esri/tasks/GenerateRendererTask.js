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
define("esri/tasks/GenerateRendererTask","dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/_base/Deferred dojo/has esri/kernel esri/request esri/deferredUtils esri/renderers/jsonUtils esri/tasks/Task dojo/has!extend-esri?esri/tasks/GenerateRendererParameters dojo/has!extend-esri?esri/tasks/ClassificationDefinition dojo/has!extend-esri?esri/tasks/ClassBreaksDefinition dojo/has!extend-esri?esri/tasks/UniqueValueDefinition dojo/has!extend-esri?esri/tasks/ColorRamp dojo/has!extend-esri?esri/tasks/AlgorithmicColorRamp dojo/has!extend-esri?esri/tasks/MultipartColorRamp".split(" "),
function(b,c,k,l,h,m,n,p,q,r){b=b(r,{declaredClass:"esri.tasks.GenerateRendererTask",_eventMap:{complete:["renderer"]},constructor:function(a,d){this.url=a;this._url.path+="/generateRenderer";this._handler=c.hitch(this,this._handler);this.source=d&&d.source;this.gdbVersion=d&&d.gdbVersion;this.registerConnectEvents()},_handler:function(a,d,b,c,f){try{var g=q.fromJson(a);"classBreaks"===a.type&&g.setMaxInclusive(!0);this._successHandler([g],"onComplete",b,f)}catch(e){this._errorHandler(e,c,f)}},execute:function(a,
d,b){a=c.mixin(a.toJson(),{f:"json"});var h=this._handler,f=this._errorHandler;if(this.source){var g={source:this.source.toJson()};a.layer=k.toJson(g)}this.gdbVersion&&(a.gdbVersion=this.gdbVersion);var e=new l(p._dfdCanceller);e._pendingDfd=n({url:this._url.path,content:a,callbackParamName:"callback",load:function(a,c){h(a,c,d,b,e)},error:function(a){f(a,b,e)}});return e},onComplete:function(){}});h("extend-esri")&&c.setObject("tasks.GenerateRendererTask",b,m);return b});