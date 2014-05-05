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
define("esri/symbols/TextSymbol","dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/has dojox/gfx/_base esri/kernel esri/lang esri/symbols/Symbol esri/symbols/Font".split(" "),function(c,d,m,n,e,g,h,k,l){var f={color:[0,0,0,1],font:e.defaultFont,angle:0,xoffset:0,yoffset:0};d.mixin(f,e.defaultText,{type:"textsymbol",align:"middle"});c=c(k,{declaredClass:"esri.symbol.TextSymbol",angle:0,xoffset:0,yoffset:0,constructor:function(a,b,c){d.mixin(this,f);this.font=new l(this.font);this.color=new m(this.color);
a&&(d.isObject(a)?(d.mixin(this,a),this.color&&h.isDefined(this.color[0])&&(this.color=k.toDojoColor(this.color)),this.type="textsymbol",this.font=new l(this.font),this.xoffset=e.pt2px(this.xoffset),this.yoffset=e.pt2px(this.yoffset)):(this.text=a,b&&(this.font=b),c&&(this.color=c)))},setFont:function(a){this.font=a;return this},setAngle:function(a){this.angle=a;return this},setOffset:function(a,b){this.xoffset=a;this.yoffset=b;return this},setAlign:function(a){this.align=a;return this},setDecoration:function(a){this.decoration=
a;return this},setRotated:function(a){this.rotated=a;return this},setKerning:function(a){this.kerning=a;return this},setText:function(a){this.text=a;return this},getStroke:function(){return null},getFill:function(){return this.color},getWidth:function(){for(var a=this.getHeight(),b=0,c=0;c<this.text.length;c++)var d=this.text.charAt(c),b=d==d.toUpperCase()?b+0.7*a:b+0.5*a;return b},getHeight:function(){return e.normalizedLength(this.font.size)},toJson:function(){var a=e.px2pt(this.xoffset),a=isNaN(a)?
void 0:a,b=e.px2pt(this.yoffset),b=isNaN(b)?void 0:b;return h.fixJson(d.mixin(this.inherited("toJson",arguments),{type:"esriTS",backgroundColor:this.backgroundColor,borderLineColor:this.borderLineColor,verticalAlignment:this.verticalAlignment,horizontalAlignment:this.horizontalAlignment,rightToLeft:this.rightToLeft,width:this.width,angle:this.angle,xoffset:a,yoffset:b,text:this.text,align:this.align,decoration:this.decoration,rotated:this.rotated,kerning:this.kerning,font:this.font.toJson()}))}});
d.mixin(c,{ALIGN_START:"start",ALIGN_MIDDLE:"middle",ALIGN_END:"end",DECORATION_NONE:"none",DECORATION_UNDERLINE:"underline",DECORATION_OVERLINE:"overline",DECORATION_LINETHROUGH:"line-through"});c.defaultProps=f;n("extend-esri")&&(d.setObject("symbol.TextSymbol",c,g),g.symbol.defaultTextSymbol=f);return c});