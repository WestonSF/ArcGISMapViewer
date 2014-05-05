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
define("esri/tasks/query","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/has esri/kernel esri/geometry/jsonUtils esri/tasks/SpatialRelationship dojo/has!extend-esri?esri/tasks/QueryTask dojo/has!extend-esri?esri/tasks/RelationshipQuery dojo/has!extend-esri?esri/tasks/StatisticDefinition".split(" "),function(n,c,p,d,q,r,s,t){var e=n(null,{declaredClass:"esri.tasks.Query",constructor:function(){this.spatialRelationship=e.SPATIAL_REL_INTERSECTS},text:null,where:"",geometry:null,
groupByFieldsForStatistics:null,objectIds:null,returnGeometry:!1,orderByFields:null,outSpatialReference:null,outFields:null,outStatistics:null,timeExtent:null,relationParam:null,pixelSize:null,toJson:function(a){var b={text:this.text,where:this.where,returnGeometry:this.returnGeometry,spatialRel:this.spatialRelationship,maxAllowableOffset:this.maxAllowableOffset,geometryPrecision:this.geometryPrecision};a=a&&a.geometry||this.geometry;var c=this.objectIds,g=this.outFields,f=this.outSpatialReference,
h=this.groupByFieldsForStatistics,k=this.orderByFields,l=this.outStatistics;a&&(b.geometry=a,b.geometryType=s.getJsonType(a),b.inSR=a.spatialReference.wkid||d.toJson(a.spatialReference.toJson()));c&&(b.objectIds=c.join(","));g&&(b.outFields=g.join(","));h&&(b.groupByFieldsForStatistics=h.join(","));k&&(b.orderByFields=k.join(","));if(l){var m=[];p.forEach(l,function(a,b){m.push(a.toJson())});b.outStatistics=d.toJson(m)}null!==f?b.outSR=f.wkid||d.toJson(f.toJson()):a&&(b.outSR=a.spatialReference.wkid||
d.toJson(a.spatialReference.toJson()));a=this.timeExtent;b.time=a?a.toJson().join(","):null;if((a=this.relationParam)&&this.spatialRelationship===e.SPATIAL_REL_RELATION)b.relationParam=a;b.pixelSize=this.pixelSize?d.toJson(this.pixelSize.toJson()):null;b._ts=this._ts;return b}});c.mixin(e,t);q("extend-esri")&&c.setObject("tasks.Query",e,r);return e});