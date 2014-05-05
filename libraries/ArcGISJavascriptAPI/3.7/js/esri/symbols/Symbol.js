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
define("esri/symbols/Symbol","dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/has esri/kernel esri/lang".split(" "),function(b,c,g,h,d,k){function e(a){return a&&new g([a[0],a[1],a[2],a[3]/255])}function f(a){return a&&[a.r,a.g,a.b,Math.round(255*a.a)]}b=b(null,{declaredClass:"esri.symbol.Symbol",color:new g([0,0,0,1]),type:null,_stroke:null,_fill:null,constructor:function(a){if(a&&c.isObject(a)&&(c.mixin(this,a),this.color&&k.isDefined(this.color[0])&&(this.color=e(this.color)),(a=this.type)&&
0===a.indexOf("esri")))this.type={esriSMS:"simplemarkersymbol",esriPMS:"picturemarkersymbol",esriSLS:"simplelinesymbol",esriCLS:"cartographiclinesymbol",esriSFS:"simplefillsymbol",esriPFS:"picturefillsymbol",esriTS:"textsymbol"}[a]},setColor:function(a){this.color=a;return this},toJson:function(){return{color:f(this.color)}}});b.toDojoColor=e;b.toJsonColor=f;h("extend-esri")&&(c.setObject("symbol.Symbol",b,d),d.symbol.toDojoColor=e,d.symbol.toJsonColor=f);return b});