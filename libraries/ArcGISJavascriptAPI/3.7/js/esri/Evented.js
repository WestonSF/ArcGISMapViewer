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
define("esri/Evented","dojo/_base/declare dojo/_base/lang dojo/aspect dojo/Evented dojo/on dojo/has esri/kernel".split(" "),function(l,h,m,n,r,p,q){l=l([n],{declaredClass:"esri.Evented",registerConnectEvents:function(){var d=this.constructor,b=this.constructor._meta.parents,c=[{}],f={},a,e,g=function(a,b){h.isArray(a)||(a=[a]);for(var c=0;c<a.length;c++){var d=a[c];d._meta&&d._meta.parents&&g(d._meta.parents,b);d.prototype._eventMap&&b.push(h.mixin({},d.prototype._eventMap))}return b};if(!d._onMap){g(b,
c);c.push(this._eventMap);b=h.mixin.apply(this,c);for(a in this)/^on\w/.test(a)&&h.isFunction(this[a])&&(c=this._hyphenLower(a).toLowerCase(),b[c]||(f[c]={method:a}));for(e in b)a=this._onCamelCase(e),f[e]={method:a,argKeys:b[e]};d._onMap=f;return d._onMap}},on:function(d,b){var c=this.constructor._onMap||this.registerConnectEvents(),f="string"==typeof d&&d.toLowerCase(),a=this._onCamelCase(f),e=c&&c[f];return(a=e&&e.method||this[a]&&h.isFunction(this[a])&&a)?e&&h.isArray(e.argKeys)?(c=this._onArr2Obj(b,
c[f].argKeys),m.after(this,a,c,!0)):m.after(this,a,b,!0):this.inherited(arguments)},emit:function(d,b){var c,f,a,e,g=d.toLowerCase();e=this._onCamelCase(d);var k=this.constructor._onMap||this.registerConnectEvents();e=(a=k&&k[g]&&k[g].method||h.isFunction(this[e])&&e)&&this[a];a&&(k&&k[g])&&this._onObj2Arr(function(){f=Array.prototype.slice.call(arguments)},k[g].argKeys)(b);b=b||{};b.target||(b.target=this);e&&(c=f&&f.length?f:[b],c=e.apply(this,c));this.inherited(arguments,[d,b]);return c},_onObj2Arr:function(d,
b){if(b){var c=this;return function(f){var a,e=[],g=b.length;for(a=0;a<g;a++)e[a]=f[b[a]];d.apply(c,e)}}return d},_onArr2Obj:function(d,b){if(b){var c=this;return function(){var f,a={},e=arguments.length;for(f=0;f<e;f++)a[b[f]]=arguments[f];a.target||(a.target=c);d(a)}}return d},_hyphenLower:function(d){return d.replace(/^on/,"").replace(/[A-Z](?=[a-z])/g,function(b,c){return(c?"-":"")+b.toLowerCase()})},_onCamelCase:function(d){return"on"+d.substr(0,1).toUpperCase()+d.substr(1).replace(/\-([a-z])/g,
function(b,c){return c.toUpperCase()})}});p("extend-esri")&&(q.Evented=l);return l});