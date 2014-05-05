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
define("esri/dijit/geoenrichment/InfographicsOptions","../../declare dojo/_base/lang dojo/Deferred dojo/string ../../tasks/geoenrichment/studyAreaOptionsFromJson ../../tasks/geoenrichment/GeoenrichmentTask ./lang ./config".split(" "),function(g,t,B,w,C,D,h,l){function E(a,c){var b=parseFloat(a.index),e=parseFloat(c.index);return isNaN(b)&&isNaN(e)?0:isNaN(b)?1:isNaN(e)?-1:b-e}function x(a,c){for(var b=0;b<a.length;b++){var e=a[b];if(e.type==c.type&&h.arraysEqual(e.variables,c.variables))return{report:e,
index:b}}return null}function m(a,c){if(a)for(var b in a){c[b]=[];for(var e=0;e<a[b].length;e++){var d={};y(a[b][e],d);c[b].push(d)}}}function y(a,c){c.type=a.type||("OneVarMultiComparison"==a.report?"OneVar":a.report);if(a.dataCollection)if(a.vars){c.variables=[];for(var b=0;b<a.vars.length;b++)c.variables.push(a.dataCollection+"."+a.vars[b])}else c.variables=[a.dataCollection+".*"];else c.variables=a.variables;h.isBoolean(a.isVisible)?c.isVisible=a.isVisible:h.isBoolean(a.checked)&&(c.isVisible=
a.checked)}var u=function(a,c){this.type=a;this.variables=c;this.index=this.datasetID=this.title=null;this.isVisible=!0};g=g("esri.dijit.geoenrichment.InfographicsOptions",null,{_items:null,_loaded:null,studyAreaOptions:null,theme:"common",constructor:function(a){this._loaded={};this.studyAreaOptions=C(a&&(a.buffer||a.studyAreaOptions));this._items={};a&&(m(a.reports||a.items,this._items),a.theme&&(this.theme=a.theme))},toJson:function(){var a={};m(this._items,a);return{studyAreaOptions:this.studyAreaOptions.toJson(),
items:a,theme:this.theme}},getItems:function(a){var c=new B;if(this._loaded[a])c.resolve(this._items[a]);else{var b=new D(l.server);b.token=l.token;b.getDataCollections(a).then(t.hitch(this,this._mergeItems,a,c),function(a){c.reject(a)})}return c.promise},_mergeItems:function(a,c,b){try{for(var e=[],d=0;d<b.length;d++){var g=b[d].metadata.infographics;if(g){var p,h=b[d].metadata.datasets;h&&(p=w.trim(h.split(",")[0]));var v=JSON.parse(g),q;for(q in v){var n=new u(q,[b[d].id+".*"]);n.datasetID=p;for(var l in v[q])n[l]=
v[q][l];var k=x(e,n);k?e[k.index]=n:e.push(n)}}}var r,s,m=function(){r={};s={};for(var a=0;a<b.length;a++){s[b[a].id]=b[a];for(var c=0;c<b[a].variables.length;c++)r[b[a].id+"."+b[a].variables[c].id]=b[a].variables[c]}},g=function(a){r||m();return r[a]};p=function(a){s||m();return s[a]};var f=this._items[a];f||(f=[],f.push(new u("OneVar",["KeyGlobalFacts.AVGHHSZ"])),this._items[a]=f);for(d=f.length-1;0<=d;d--)if(k=x(e,f[d]))y(f[d],k.report),f[d]=k.report,e.splice(k.index,1);else{if("OneVar"==f[d].type&&
1==f[d].variables.length){var z=f[d].variables[0],A=g(z);if(A){f[d].title=A.alias;f[d].datasetID=w.trim(p(z.split(".")[0]).metadata.datasets.split(",")[0]);continue}}f.splice(d,1);d--}for(d=0;d<e.length;d++)f.push(e[d]);f.sort(E);this._loaded[a]=!0;c.resolve(f)}catch(t){c.reject(t)}}});g.Item=u;return g});