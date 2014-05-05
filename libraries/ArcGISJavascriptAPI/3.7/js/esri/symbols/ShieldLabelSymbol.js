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
define("esri/symbols/ShieldLabelSymbol","dojo/_base/declare dojo/_base/lang dojo/sniff dojox/gfx/_base esri/kernel esri/lang esri/urlUtils esri/symbols/MarkerSymbol esri/symbols/Font".split(" "),function(b,e,h,f,k,m,n,p,q){var g={url:"",width:12,height:12,angle:0,xoffset:0,yoffset:0};b=b(p,{declaredClass:"esri.symbol.ShieldLabelSymbol",type:"shieldlabelsymbol",color:[255,255,255,1],width:32,height:32,font:new q,constructor:function(a,d,c,l,b){a?e.isString(a)?(this.url=a,d&&(this.color=d),c&&(this.width=
c),l&&(this.height=l),void 0!==b&&(this.font=b)):(this.width=f.pt2px(a.width),this.height=f.pt2px(a.height),d=a.imageData,!(9>h("ie"))&&d&&(c=this.url,this.url="data:"+(a.contentType||"image")+";base64,"+d,this.imageData=c)):e.mixin(this,g)},getStroke:function(){return null},getFill:function(){return this.color},setWidth:function(a){this.width=a;return this},setHeight:function(a){this.height=a;return this},setUrl:function(a){a!==this.url&&(delete this.imageData,delete this.contentType);this.url=a;
return this},setFont:function(a){this.font=a;return this},setText:function(a){this.text=a;return this},getWidth:function(){return this.width},getHeight:function(){return this.height},getShapeDescriptors:function(){return{defaultShape:{type:"image",x:-Math.round(this.width/2),y:-Math.round(this.height/2),width:this.width,height:this.height,src:this.url||""},fill:null,stroke:null}},toJson:function(){var a=this.url,d=this.imageData;if(0===a.indexOf("data:"))var c=a,a=d,d=c.indexOf(";base64,")+8,d=c.substr(d);
var a=n.getAbsoluteUrl(a),c=f.px2pt(this.width),c=isNaN(c)?void 0:c,b=f.px2pt(this.height),b=isNaN(b)?void 0:b,a=m.fixJson(e.mixin(this.inherited("toJson",arguments),{type:"esriPMS",url:a,imageData:d,contentType:this.contentType,width:c,height:b}));delete a.color;delete a.size;a.imageData||delete a.imageData;return a}});b.defaultProps=g;h("extend-esri")&&(e.setObject("symbol.ShieldLabelSymbol",b,k),k.symbol.defaultShieldLabelSymbol=g);return b});