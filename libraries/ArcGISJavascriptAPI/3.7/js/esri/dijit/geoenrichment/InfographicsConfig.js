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
define("esri/dijit/geoenrichment/InfographicsConfig","../../declare dojo/_base/lang dojo/aspect dojo/string ./_Wizard ./_Interop ./InfographicsOptions ./InfographicsMainPage ./InfographicsDataCollectionsPage ./VariablesPage ./lang".split(" "),function(k,b,l,q,d,m,h,r,s,t,u){function n(c,b){return"OneVar"!=c.type||1!=c.variables.length||!u.startsWith(c.variables[0],b.id)?!1:!0}d=k("esri.dijit.geoenrichment.InfographicsConfig",[d],{options:null,_eventMap:{ok:!0,cancel:!0},constructor:function(){this.pages.main=
new r({onAddVariables:b.hitch(this,this._addVariables),onOK:b.hitch(this,this._onOK),onCancel:b.hitch(this,this._onCancel)})},startup:function(){this.inherited(arguments);this.options||this.set("options",new h);this.loadPage("main")},_setOptionsAttr:function(c){this._set("options",c);this.pages.main.set("options",c)},_addVariables:function(){this.pages.dataCollections||(this.pages.dataCollections=new s({onPick:b.hitch(this,this._onDataCollectionPicked),onBack:b.hitch(this,this.loadPage,"main"),onCancel:b.hitch(this,
this._onCancel)}));this.pages.dataCollections.set("country",this.pages.main.get("country"));this.loadPage("dataCollections")},_onDataCollectionPicked:function(c){this.pages.variables||(this.pages.variables=new t({onOK:b.hitch(this,this._applyVariables),onBack:b.hitch(this,this.loadPage,"dataCollections"),onCancel:b.hitch(this,this._onCancel)}));this.pages.variables.set("dataCollection",c);for(var p={},e=this.pages.main.get("items"),f=0;f<e.length;f++){var a=e[f];n(a,c)&&(a=a.variables[0].split(".")[1],
p[a]=!0)}this.pages.variables.set("checks",p);this.loadPage("variables")},_applyVariables:function(){for(var c={},b=this.pages.variables.get("dataCollection"),e=this.pages.variables.get("checks"),f=b.variables,a=0;a<f.length;a++)c[f[a].id]=!e||e[f[a].id];e=this.pages.main.get("items");for(a=e.length-1;0<=a;a--){var g=e[a];n(g,b)&&(g=g.variables[0].split(".")[1],c[g]?c[g]=!1:e.splice(a,1))}for(a=0;a<f.length;a++)if(c[f[a].id]){var d=f[a],g=new h.Item("OneVar",[b.id+"."+d.id]);g.title=d.alias;if(d=
b.metadata.datasets)g.datasetID=q.trim(d.split(",")[0]);e.push(g)}this.pages.main.set("options",this.options);this.loadPage("main")},_onOK:function(){this.onOK()},onOK:function(){},_onCancel:function(){this.onCancel()},onCancel:function(){}});d.Interop=k([d,m],{postMixInProperties:function(){l.after(this,"onCancel",b.hitch(this,this._onCancel));l.after(this,"onOK",b.hitch(this,this._onOK));this.inherited(arguments)},_onOK:function(){this._onChange("options");this._onCommand("OnOK")},_onCancel:function(){this._onCommand("OnCancel")},
converters:{options:new m.CtorConverter(h)}});return d});