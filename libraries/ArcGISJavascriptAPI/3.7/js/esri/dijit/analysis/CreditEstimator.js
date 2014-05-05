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
require({cache:{"url:esri/dijit/analysis/templates/CreditEstimator.html":'\x3cdiv class\x3d"esriAnalysis esriSimpleForm"\x3e\r\n  \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_table"  style\x3d"border-collapse:collapse;border-spacing:5px;"\x3e\r\n     \x3c!--\x3ctr\x3e\r\n      \x3ctd\x3e\r\n        \x3clabel class\x3d"esriFloatLeading"\x3e${i18n.analysisLayersLabel}\x3c/label\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e--\x3e\r\n     \x3ctr\x3e\r\n      \x3ctd\x3e\r\n        \x3clabel class\x3d"esriFloatLeading"\x3e${i18n.totalRecordsLabel}\x3c/label\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd data-dojo-attach-point\x3d"_totalRecordsNode"\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n     \x3c!--\x3ctr\x3e\r\n      \x3ctd\x3e\r\n        \x3clabel class\x3d"esriFloatLeading"\x3e${i18n.creditsAvailLabel}\x3c/label\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e--\x3e\r\n     \x3ctr\x3e\r\n      \x3ctd\x3e\r\n        \x3clabel class\x3d"esriFloatLeading"\x3e${i18n.creditsReqLabel}\x3c/label\x3e\r\n      \x3c/td\x3e\r\n      \x3ctd data-dojo-attach-point\x3d"_creditsReqNode"\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n  \x3c/table\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"_messageDiv"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/analysis/CreditEstimator","require dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/event dojo/_base/kernel dojo/has dojo/dom-construct dojo/dom-class dojo/dom-attr dojo/dom-style dojo/string dojo/number dijit/_WidgetBase dijit/_TemplatedMixin dijit/_OnDijitClickMixin dijit/_FocusMixin esri/kernel esri/lang dojo/i18n!esri/nls/jsapi dojo/text!esri/dijit/analysis/templates/CreditEstimator.html".split(" "),function(d,l,e,v,w,x,m,y,z,b,g,n,h,p,q,r,s,t,k,f,u){d=l([p,
q,r,s],{declaredClass:"esri.dijit.analysis.CreditEstimator",i18n:null,basePath:d.toUrl("esri/dijit/analysis"),templateString:u,postMixInProperties:function(){this.inherited(arguments);this.i18n={};e.mixin(this.i18n,f.common);e.mixin(this.i18n,f.analysisMsgCodes);e.mixin(this.i18n,f.creditEstimator)},postCreate:function(){this.inherited(arguments)},_setContentAttr:function(a){var c="";a.code&&!a.messageCode&&(a.messageCode=a.code);a.messageCode?(c=k.isDefined(this.i18n[a.messageCode])?this.i18n[a.messageCode]:
a.message,c=k.isDefined(a.params)?n.substitute(c,a.params):c,b.set(this._messageDiv,"display","block"),b.set(this._messageDiv,"innerHTML",c),g.set(this._table,"display","none")):(g.set(this._table,"display","table"),b.set(this._messageDiv,"display","none"),b.set(this._messageDiv,"innerHTML",""),b.set(this._totalRecordsNode,"innerHTML",h.format(a.totalRecords,{locale:dojo.locale})),b.set(this._creditsReqNode,"innerHTML",h.format(a.cost,{locale:dojo.locale})))}});m("extend-esri")&&e.setObject("dijit.analysis.CreditEstimator",
d,t);return d});