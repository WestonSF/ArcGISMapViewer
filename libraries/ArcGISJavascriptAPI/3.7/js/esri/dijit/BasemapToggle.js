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
require({cache:{"url:esri/dijit/templates/BasemapToggle.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"_toggleNode" title\x3d"${_i18n.widgets.basemapToggle.toggle}" role\x3d"button" data-dojo-attach-event\x3d"ondijitclick:toggle" class\x3d"${_css.toggleButton}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/BasemapToggle","dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has esri/kernel dijit/_WidgetBase dijit/_OnDijitClickMixin dijit/_TemplatedMixin dojo/on dojo/text!esri/dijit/templates/BasemapToggle.html dojo/i18n!esri/nls/jsapi dojo/dom-class dojo/dom-style dojo/dom-construct".split(" "),function(e,h,g,n,p,q,r,s,k,t,b,f,l,m){var d=require.toUrl("esri/dijit");e=h([q,r,s,e],{declaredClass:"esri.dijit.BasemapToggle",templateString:t,options:{theme:"BasemapToggle",map:null,visible:!0,
basemap:"hybrid",defaultBasemap:"streets",basemaps:{streets:{label:b.widgets.basemapToggle.basemapLabels.streets,url:d+"/images/basemaps/streets.jpg"},satellite:{label:b.widgets.basemapToggle.basemapLabels.satellite,url:d+"/images/basemaps/satellite.jpg"},hybrid:{label:b.widgets.basemapToggle.basemapLabels.hybrid,url:d+"/images/basemaps/hybrid.jpg"},topo:{label:b.widgets.basemapToggle.basemapLabels.topo,url:d+"/images/basemaps/topo.jpg"},gray:{label:b.widgets.basemapToggle.basemapLabels.gray,url:d+
"/images/basemaps/gray.jpg"},oceans:{label:b.widgets.basemapToggle.basemapLabels.oceans,url:d+"/images/basemaps/oceans.jpg"},"national-geographic":{label:b.widgets.basemapToggle.basemapLabels["national-geographic"],url:d+"/images/basemaps/national-geographic.jpg"},osm:{label:b.widgets.basemapToggle.basemapLabels.osm,url:d+"/images/basemaps/osm.jpg"}}},constructor:function(a,c){h.safeMixin(this.options,a);this.domNode=c;this._i18n=b;this.set("map",this.options.map);this.set("theme",this.options.theme);
this.set("visible",this.options.visible);this.set("basemaps",this.options.basemaps);this.set("basemap",this.options.basemap);this.set("defaultBasemap",this.options.defaultBasemap);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this._css={container:"basemapContainer",toggleButton:"toggleButton",basemapImage:"basemapImage",basemapTitle:"basemapTitle"}},startup:function(){this.map||(this.destroy(),console.log("BasemapToggle::map required"));this.map.loaded?this._init():
k(this.map,"load",g.hitch(this,function(){this._init()}))},destroy:function(){this.inherited(arguments)},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},toggle:function(){var a=this.map.getBasemap();a&&this.set("defaultBasemap",a);var a=this.get("defaultBasemap"),c=this.get("basemap");a!==c&&(this.map.setBasemap(c),this.set("basemap",a),this.emit("toggle",{previousBasemap:a,currentBasemap:c}))},_init:function(){this._visible();this._basemapChange();k(this.map,"basemap-change",
g.hitch(this,function(){this._basemapChange()}));this.set("loaded",!0);this.emit("load",{})},_getBasemapInfo:function(a){var c=this.get("basemaps");if(c&&c.hasOwnProperty(a))return c[a]},_basemapChange:function(){var a=this.map.getBasemap();a&&this.set("defaultBasemap",a);var a=this.get("defaultBasemap"),c=this.get("basemap"),b=this._getBasemapInfo(c),d;d=""+('\x3cdiv class\x3d"'+this._css.basemapImage+'"\x3e\x3cimg alt\x3d"'+b.label+'" src\x3d"'+b.url+'" /\x3e\x3c/div\x3e');d+='\x3cdiv class\x3d"'+
this._css.basemapTitle+'"\x3e'+b.label+"\x3c/div\x3e";f.remove(this._toggleNode,a);f.add(this._toggleNode,c);m.empty(this._toggleNode);m.place(d,this._toggleNode,"only")},_updateThemeWatch:function(a,c,b){this.get("loaded")&&(f.remove(this.domNode,c),f.add(this.domNode,b))},_visible:function(){this.get("visible")?l.set(this.domNode,"display","block"):l.set(this.domNode,"display","none")}});n("extend-esri")&&g.setObject("dijit.BasemapToggle",e,p);return e});