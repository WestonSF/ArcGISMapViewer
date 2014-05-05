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
require({cache:{"url:esri/dijit/templates/LocateButton.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"_locateNode" title\x3d"${_i18n.widgets.locateButton.locate.title}" role\x3d"button" data-dojo-attach-event\x3d"ondijitclick:locate" class\x3d"${_css.locate}"\x3e\x3cspan\x3e${_i18n.widgets.locateButton.locate.button}\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/LocateButton","dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has esri/kernel dijit/_WidgetBase dijit/_OnDijitClickMixin dijit/_TemplatedMixin dojo/on dojo/text!esri/dijit/templates/LocateButton.html dojo/i18n!esri/nls/jsapi dojo/dom-class dojo/dom-style esri/geometry/webMercatorUtils esri/geometry/Point esri/SpatialReference esri/graphic esri/symbols/PictureMarkerSymbol esri/layers/GraphicsLayer".split(" "),function(b,d,a,h,k,l,m,n,p,q,r,e,g,s,t,u,v,w,x){b=d([l,m,n,b],{declaredClass:"esri.dijit.LocateButton",
templateString:q,options:{theme:"LocateButton",map:null,visible:!0,highlightLocation:!0,symbol:new w(require.toUrl("esri/dijit")+"/images/blue-dot.png",21,21),infoTemplate:null,scale:null,geolocationOptions:{maximumAge:3E3,timeout:1E3,enableHighAccuracy:!0}},constructor:function(c,a){d.safeMixin(this.options,c);this.domNode=a;this._i18n=r;navigator.geolocation||(this.options.visible=!1);this.set("map",this.options.map);this.set("theme",this.options.theme);this.set("visible",this.options.visible);
this.set("scale",this.options.scale);this.set("highlightLocation",this.options.highlightLocation);this.set("symbol",this.options.symbol);this.set("infoTemplate",this.options.infoTemplate);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this._css={container:"locateContainer",locate:"zoomLocateButton",loading:"loading"}},startup:function(){this.map||(this.destroy(),console.log("LocateButton::map required"));this._graphics=new x;this.map.addLayer(this._graphics);this.map.loaded?
this._init():p(this.map,"load",a.hitch(this,function(){this._init()}))},destroy:function(){this.inherited(arguments)},clear:function(){this._graphics.clear()},locate:function(){this._showLoading();navigator.geolocation?navigator.geolocation.getCurrentPosition(a.hitch(this,function(c){if(c){var b=c.coords.latitude,e=c.coords.longitude,d=this.get("scale")||c.coords.accuracy||5E4,f=s.geographicToWebMercator(new t(e,b,new u(4326)));if(f)return this.map.setScale(d),this.map.centerAt(f).then(a.hitch(this,
function(){this.get("highlightLocation")&&this.clear();var a={position:c},a=new v(f,this.get("symbol"),a,this.get("infoTemplate"));this.get("highlightLocation")&&this._graphics.add(a);this._hideLoading();this.emit("locate",{graphic:a,scale:d,position:c})}));this._hideLoading();console.log("LocateButton::Invalid point")}else this._hideLoading(),console.log("LocateButton::Invalid position")}),a.hitch(this,function(a){this._hideLoading();return a}),this.options.geolocationOptions):(this._hideLoading(),
console.log("LocateButton::geolocation unsupported"))},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},_showLoading:function(){e.add(this._locateNode,this._css.loading)},_hideLoading:function(){e.remove(this._locateNode,this._css.loading)},_init:function(){this._visible();this.set("loaded",!0);this.emit("load",{})},_updateThemeWatch:function(a,b,d){e.remove(this.domNode,b);e.add(this.domNode,d)},_visible:function(){this.get("visible")?g.set(this.domNode,"display","block"):
g.set(this.domNode,"display","none")}});h("extend-esri")&&a.setObject("dijit.LocateButton",b,k);return b});