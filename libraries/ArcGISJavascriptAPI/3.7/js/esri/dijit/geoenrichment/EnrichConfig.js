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
define("esri/dijit/geoenrichment/EnrichConfig","../../declare dojo/_base/lang dojo/aspect ./_Wizard ./_Interop ../../tasks/geoenrichment/EnrichParameters ../../tasks/geoenrichment/RingBuffer ./EnrichDataCollectionsPage ./EnrichOptionsPage".split(" "),function(n,a,p,c,b,q,r,s,t,u){function l(k){var a={};if(k)for(var f in k)a[f.split(".")[0]]=!0;return a}c=n("esri.dijit.geoenrichment.EnrichConfig",[c],{enrichParams:null,geomType:null,fields:null,fieldsMap:null,allowNewColumns:!0,studyAreaCount:null,
showBackButton:!0,_dataCollections:null,_eventMap:{back:!0,finish:["params","fieldsMap","dataCollections"]},startup:function(){this.inherited(arguments);this.enrichParams||(this.enrichParams=new q);this.enrichParams.studyAreaOptions=new r;this.pages.dataCollections=new s({country:this.enrichParams.countryID,showBackButton:this.showBackButton,onBack:a.hitch(this,this._onBack),onNext:a.hitch(this,this._onDataCollectionsPicked)});this._loadDataCollectionsPage()},_loadDataCollectionsPage:function(){var a=
l(this.fieldsMap);this.pages.dataCollections.set("checks",a);this.loadPage("dataCollections")},_onDataCollectionsPicked:function(){this._dataCollections=this.pages.dataCollections.dataCollections;this.pages.options||(this.pages.options=new t({buffer:this.enrichParams.studyAreaOptions,geomType:this.geomType,fields:this.fields,allowNewColumns:this.allowNewColumns,studyAreaCount:this.studyAreaCount,onBack:a.hitch(this,function(){this.fieldsMap=this.pages.options.get("fieldsMap");this._loadDataCollectionsPage()}),
onFinish:a.hitch(this,this._finish)}));this.pages.options.set("dataCollections",this._dataCollections);for(var k=l(this.fieldsMap),c=this.pages.dataCollections.get("checks"),f={},d=0;d<this._dataCollections.length;d++){var m=this._dataCollections[d].id;if(c[m])for(var g=this._dataCollections[d].variables,e=0;e<g.length;e++){var h=m+"."+g[e].id,b;if(k[m]){if(b=this.fieldsMap[h],!a.isString(b))continue}else b="";f[h]=b}}this.fieldsMap=f;this.pages.options.set("fieldsMap",f);this.loadPage("options")},
_onBack:function(){this.onBack()},onBack:function(){},_finish:function(){this.enrichParams.countryID=this.pages.dataCollections.get("country");this.fieldsMap=null;this.pages.options&&(this.enrichParams.studyAreaOptions=this.pages.options.get("buffer"),this.fieldsMap=this.pages.options.get("fieldsMap"));var a=[],b=l(this.fieldsMap);this.enrichParams.variables=[];for(var f=0;f<this._dataCollections.length;f++){var d=this._dataCollections[f];if(b[d.id]){a.push(d);for(var c=!0,g=[],e=0;e<d.variables.length;e++){var h=
d.id+"."+d.variables[e].id;void 0!==this.fieldsMap[h]?g.push(h):c=!1}if(c)this.enrichParams.variables.push(d.id+".*");else for(e=0;e<g.length;e++)this.enrichParams.variables.push(g[e])}}this.onFinish(this.enrichParams,this.fieldsMap,a)},onFinish:function(a,b,c){}});c.Interop=n([c,b],{postMixInProperties:function(){p.after(this,"onBack",a.hitch(this,this._onCancel));p.after(this,"onFinish",a.hitch(this,this._onOK));this.inherited(arguments)},_onOK:function(){this._onChange("enrichParams");this._onChange("fieldsMap");
this._onCommand("OnOK")},_onCancel:function(){this._onCommand("OnCancel")},converters:{enrichParams:new b.RestConverter(q),allowNewColumns:b.BoolConverter,showBackButton:b.BoolConverter}});return c});