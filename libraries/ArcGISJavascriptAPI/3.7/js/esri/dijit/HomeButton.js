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
require({cache:{"url:esri/dijit/templates/HomeButton.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"_homeNode" title\x3d"${_i18n.widgets.homeButton.home.title}" role\x3d"button" data-dojo-attach-event\x3d"ondijitclick:home" class\x3d"${_css.home}"\x3e\x3cspan\x3e${_i18n.widgets.homeButton.home.button}\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/HomeButton","dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has esri/kernel dijit/_WidgetBase dijit/_OnDijitClickMixin dijit/_TemplatedMixin dojo/on dojo/text!esri/dijit/templates/HomeButton.html dojo/i18n!esri/nls/jsapi dojo/dom-class dojo/dom-style".split(" "),function(a,c,b,f,g,h,k,l,m,n,p,d,e){a=c([h,k,l,a],{declaredClass:"esri.dijit.HomeButton",templateString:n,options:{theme:"HomeButton",map:null,extent:null,visible:!0},constructor:function(q,a){c.safeMixin(this.options,
q);this.domNode=a;this._i18n=p;this.set("map",this.options.map);this.set("theme",this.options.theme);this.set("visible",this.options.visible);this.set("extent",this.options.extent);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this._css={container:"homeContainer",home:"home",loading:"loading"}},startup:function(){this.map||(this.destroy(),console.log("HomeButton::map required"));this.map.loaded?this._init():m(this.map,"load",b.hitch(this,function(){this._init()}))},
destroy:function(){this.inherited(arguments)},home:function(){var a=this.get("extent");this._showLoading();if(a)return this.map.setExtent(a).then(b.hitch(this,function(){this._hideLoading();this.emit("home",{extent:a})}));this._hideLoading();console.log("HomeButton::no home extent")},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},_init:function(){this._visible();this.get("extent")||this.set("extent",this.map.extent);this.set("loaded",!0);this.emit("load",{})},_showLoading:function(){d.add(this._homeNode,
this._css.loading)},_hideLoading:function(){d.remove(this._homeNode,this._css.loading)},_updateThemeWatch:function(a,b,c){d.remove(this.domNode,b);d.add(this.domNode,c)},_visible:function(){this.get("visible")?e.set(this.domNode,"display","block"):e.set(this.domNode,"display","none")}});f("extend-esri")&&b.setObject("dijit.HomeButton",a,g);return a});