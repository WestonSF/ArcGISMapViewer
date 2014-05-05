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
define("esri/graphic","dojo/_base/declare dojo/_base/lang dojo/has esri/kernel esri/domUtils esri/lang esri/InfoTemplate esri/geometry/jsonUtils esri/symbols/jsonUtils".split(" "),function(e,d,h,k,f,g,l,m,n){e=e(null,{declaredClass:"esri.Graphic",constructor:function(a,b,c,d){a&&!a.declaredClass?(this.geometry=a.geometry?m.fromJson(a.geometry):null,this.symbol=a.symbol?n.fromJson(a.symbol):null,this.attributes=a.attributes||null,this.infoTemplate=a.infoTemplate?new l(a.infoTemplate):null):(this.geometry=
a,this.symbol=b,this.attributes=c,this.infoTemplate=d)},_shape:null,_graphicsLayer:null,_visible:!0,visible:!0,getDojoShape:function(){return this._shape},getNode:function(){var a=this._shape&&this._shape.getNode();return a&&a.nodeType?a:null},getLayer:function(){return this._graphicsLayer},draw:function(){var a=this._graphicsLayer;a&&a._draw(this,!0);return this},setGeometry:function(a){this.geometry=a;if(a=this._graphicsLayer)a._updateExtent(this),a._draw(this,!0);return this},setSymbol:function(a,
b){var c=this._graphicsLayer,d=this._shape;if(this.symbol=a)this.symbol._stroke=this.symbol._fill=null;c&&(b&&d&&c._removeShape(this),c._draw(this,!0));return this},setAttributes:function(a){this.attributes=a;return this},setInfoTemplate:function(a){this.infoTemplate=a;return this},getInfoTemplate:function(){return this._getEffInfoTemplate()},_getEffInfoTemplate:function(){var a=this.getLayer();return this.infoTemplate||a&&a.infoTemplate},getTitle:function(){var a=this.getInfoTemplate(),b=a&&a.title;
if(d.isFunction(b))b=b.call(a,this);else if(d.isString(b))var c=(a=this._graphicsLayer)&&a._getDateOpts,b=g.substitute(this.attributes,b,{first:!0,dateFormat:c&&c.call(a)});return b},getContent:function(){var a=this.getInfoTemplate(),b=a&&a.content;if(d.isFunction(b))b=b.call(a,this);else if(d.isString(b))var c=(a=this._graphicsLayer)&&a._getDateOpts,b=g.substitute(this.attributes,b,{dateFormat:c&&c.call(a)});return b},attr:function(a,b){var c=this.getNode();c&&(null==b?c.removeAttribute(a):c.setAttribute(a,
b));return this},show:function(){this.visible=this._visible=!0;var a=this._shape;if(a){if(a=-1===a.declaredClass.toLowerCase().indexOf("canvas")?a.getEventSource():null)this.attr("data-hidden"),f.show(a)}else this._graphicsLayer&&this._graphicsLayer._draw(this,!0);return this},hide:function(){this.visible=this._visible=!1;var a=this._shape;a&&((a=-1===a.declaredClass.toLowerCase().indexOf("canvas")?a.getEventSource():null)?(this.attr("data-hidden",""),f.hide(a)):(a=this._graphicsLayer)&&a._removeShape(this));
return this},toJson:function(){var a={};this.geometry&&(a.geometry=this.geometry.toJson());this.attributes&&(a.attributes=d.mixin({},this.attributes));this.symbol&&(a.symbol=this.symbol.toJson());this.infoTemplate&&(a.infoTemplate=this.infoTemplate.toJson());return a}});h("extend-esri")&&(k.Graphic=e);return e});