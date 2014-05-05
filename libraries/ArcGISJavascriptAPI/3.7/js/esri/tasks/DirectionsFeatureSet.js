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
define("esri/tasks/DirectionsFeatureSet","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has esri/kernel esri/geometry/Extent esri/geometry/Polyline esri/tasks/FeatureSet".split(" "),function(d,l,h,p,q,r,n,s){d=d(s,{declaredClass:"esri.tasks.DirectionsFeatureSet",constructor:function(c,m){this.routeId=c.routeId;this.routeName=c.routeName;l.mixin(this,c.summary);this.extent=new r(this.envelope);var b=this._fromCompressedGeometry,f=this.features,e=this.extent.spatialReference,a=[];h.forEach(m,
function(c,g){f[g].setGeometry(a[g]=b(c,e))});this.strings=c.strings;this.mergedGeometry=this._mergePolylinesToSinglePath(a,e);this.geometryType="esriGeometryPolyline";delete this.envelope},_fromCompressedGeometry:function(c,m){var b=0,f=0,e=[],a,d,g=c.replace(/(\+)|(\-)/g," $\x26").split(" "),k,h=g.length,l=parseInt(g[1],32);for(k=2;k<h;k+=2)b=a=parseInt(g[k],32)+b,f=d=parseInt(g[k+1],32)+f,e.push([a/l,d/l]);b=new n({paths:[e]});b.setSpatialReference(m);return b},_mergePolylinesToSinglePath:function(c,
d){var b=[];h.forEach(c,function(a){h.forEach(a.paths,function(a){b=b.concat(a)})});var f=[],e=[0,0];h.forEach(b,function(a){if(a[0]!==e[0]||a[1]!==e[1])f.push(a),e=a});return(new n({paths:[f]})).setSpatialReference(d)}});p("extend-esri")&&l.setObject("tasks.DirectionsFeatureSet",d,q);return d});