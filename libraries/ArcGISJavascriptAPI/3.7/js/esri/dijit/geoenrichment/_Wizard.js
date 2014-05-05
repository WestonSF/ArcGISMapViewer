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
define("esri/dijit/geoenrichment/_Wizard",["../../declare","dijit/_WidgetBase","dojo/dom-construct"],function(b,c,d){return b("esri.dijit.geoenrichment._Wizard",[c],{_currentPage:null,pages:null,stacking:"stretch",constructor:function(){this.pages={}},buildRendering:function(){this.domNode=d.create("div",{"class":"_Wizard_Root"})},loadPage:function(a){a=this.pages[a];this._currentPage&&this.domNode.removeChild(this._currentPage.domNode);this._currentPage=a;this.domNode.appendChild(this._currentPage.domNode);
a._started||(a.set("stacking",this.stacking),a.startup());a.load()},destroy:function(){for(var a in this.pages)this.pages[a].destroyRecursive();this.pages={};this.inherited(arguments)}})});