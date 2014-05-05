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
define("esri/symbols/Font","dojo/_base/declare dojo/_base/lang dojo/sniff dojox/gfx/_base esri/kernel esri/lang".split(" "),function(b,c,d,e,k,l){b=b(null,{declaredClass:"esri.symbol.Font",constructor:function(a,b,f,g,h){a?c.isObject(a)?c.mixin(this,a):(this.size=a,void 0!==b&&(this.style=b),void 0!==f&&(this.variant=f),void 0!==g&&(this.weight=g),void 0!==h&&(this.family=h)):c.mixin(this,e.defaultFont);9>d("ie")&&(this.size&&c.isString(this.size)&&-1<this.size.indexOf("em"))&&(this.size=e.pt2px(12*
parseFloat(this.size))+"px")},setSize:function(a){this.size=a;return this},setStyle:function(a){this.style=a;return this},setVariant:function(a){this.variant=a;return this},setWeight:function(a){this.weight=a;return this},setFamily:function(a){this.family=a;return this},toJson:function(){return l.fixJson({size:this.size,style:this.style,variant:this.variant,decoration:this.decoration,weight:this.weight,family:this.family})}});c.mixin(b,{STYLE_NORMAL:"normal",STYLE_ITALIC:"italic",STYLE_OBLIQUE:"oblique",
VARIANT_NORMAL:"normal",VARIANT_SMALLCAPS:"small-caps",WEIGHT_NORMAL:"normal",WEIGHT_BOLD:"bold",WEIGHT_BOLDER:"bolder",WEIGHT_LIGHTER:"lighter"});d("extend-esri")&&c.setObject("symbol.Font",b,k);return b});