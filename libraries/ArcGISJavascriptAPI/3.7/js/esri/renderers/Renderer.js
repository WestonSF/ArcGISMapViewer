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
define("esri/renderers/Renderer",["dojo/_base/declare","dojo/_base/lang","dojo/has","esri/kernel"],function(l,n,s,t){l=l(null,{declaredClass:"esri.renderer.Renderer",constructor:function(a){if(a&&!a.declaredClass){this.rotationInfo=a.rotationInfo;if(!this.rotationInfo){var b=a.rotationType,d=a.rotationExpression;if(b||d)this.rotationInfo={type:b,expression:d}}this.setRotationInfo(this.rotationInfo);this.setProportionalSymbolInfo(a.proportionalSymbolInfo)}this.getSymbol=n.hitch(this,this.getSymbol)},
getSymbol:function(a){},setRotationInfo:function(a){if((a=this.rotationInfo="string"===typeof a?{field:a}:a)&&a.expression&&!a.field){var b=a.expression.match(this.rotationRE);b&&b[1]&&(a.field=b[1])}return this},rotationRE:/^\[([^\]]+)\]$/i,getRotationAngle:function(a){var b=this.rotationInfo,d="arithmetic"===b.type,b=b.field,e=a.attributes,h=0;b&&(n.isFunction(b)?h=b.apply(this,arguments):e&&(h=e[b]||0),h=(h+(d?-90:0))*(d?-1:1));return h},setProportionalSymbolInfo:function(a){this.proportionalSymbolInfo=
a;return this},getSize:function(a,b){var d=a.attributes,e=this.proportionalSymbolInfo,h=e&&e.field,c=0,f="number"===typeof a?a:0;if(h){var g=e.minSize,k=e.maxSize,m=e.minDataValue,l=e.maxDataValue,q=e.valueUnit||"unknown",p=e.valueRepresentation,e=e.normalizationField,r=d?parseFloat(d[e]):void 0,e=b&&b.shape;n.isFunction(h)?f=h.apply(this,arguments):d&&(f=d[h]||0);isNaN(r)||(f/=r);if(null!=g&&null!=k&&null!=m&&null!=l)c=f<=m?g:f>=l?k:g+(f-m)/(l-m)*(k-g);else if("unknown"===q)null!=g&&null!=m&&(g&&
m?(f/=m,c="circle"===e?2*Math.sqrt(f*Math.pow(g/2,2)):"square"===e||"diamond"===e||"image"===e?Math.sqrt(f*Math.pow(g,2)):f*g):c=f+(g||m),c=c<g?g:c,null!=k&&c>k&&(c=k));else{d=(b&&b.resolution?b.resolution:a.getLayer().getMap().getResolutionInMeters())*this._meterIn[q];if("area"===p)c=Math.sqrt(f/Math.PI)/d,c*=2;else if(c=f/d,"radius"===p||"distance"===p)c*=2;null!=g&&c<g&&(c=g);null!=k&&c>k&&(c=k)}}return c=isNaN(c)?0:c},_meterIn:{inches:39.3701,feet:3.28084,yards:1.09361,miles:6.21371E-4,"nautical-miles":5.39957E-4,
millimeters:1E3,centimeters:100,decimeters:10,meters:1,kilometers:0.0010,"decimal-degrees":180/20015077},toJson:function(){var a=this.proportionalSymbolInfo,b=this.rotationInfo,d=b&&b.field,d=b&&(b.expression||d&&(n.isFunction(d)?d:"["+d+"]"));return{rotationType:b&&b.type,rotationExpression:d,proportionalSymbolInfo:a&&n.mixin({},a)}}});s("extend-esri")&&n.setObject("renderer.Renderer",l,t);return l});