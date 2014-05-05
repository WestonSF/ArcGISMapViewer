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
define("esri/dijit/analysis/utils","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/event dojo/_base/json dojo/dom-attr dojo/has dojo/i18n dojo/i18n!esri/nls/jsapi dojo/json dojo/query dojo/dom-style dijit/registry esri/kernel esri/lang esri/dijit/analysis/HelpWindow".split(" "),function(d,e,q,r,s,B,t,u,C,v,D,w,x,y,z,h,A){d={};e.mixin(d,{initHelpLinks:function(a,b,c){esri.dijit._helpDialog||(esri.dijit._helpDialog=new A);if(a){var d=y.byNode(a).get("helpFileName");
w("[esriHelpTopic]",a).forEach(function(a,p,E){a&&(x.set(a,"display",!h.isDefined(b)||!0===b?"":"none"),r.connect(a,"onclick",e.hitch(this,function(b){s.stop(b);esri.dijit._helpDialog.show(b,{helpId:t.get(a,"esriHelpTopic"),helpFileName:d,analysisGpServer:c&&c.analysisGpServer?c.analysisGpServer:null})})))},this)}},constructAnalysisFeatColl:function(a){var b={},c;b.featureCollection=a.layerDefinition;for(c in b.featureCollection)b.featureCollection.hasOwnProperty(c)&&"objectIdField"===c&&(b.featureCollection.objectIdFieldName=
e.clone(b.featureCollection.objectIdField),delete b.featureCollection.objectIdField);b.featureCollection.features=a.featureSet.features;return b},constructAnalysisInputLyrObj:function(a){var b={};a.url?(b={url:a.url},a.getDefinitionExpression&&a.getDefinitionExpression()?b.filter=a.getDefinitionExpression():h.isDefined(a.definitionExpression)&&""!==a.definitionExpression&&(b.filter=a.definitionExpression),a.credential&&(b.serviceToken=a.credential.token)):a.url||(b=a.toJson());return b},buildReport:function(a,
b){var c="",d=/<\//g,n,p;b||(b={},e.mixin(b,v.analysisMsgCodes));q.forEach(a,function(a,r){var f,g,k,l,m;if("string"===typeof a.message)f=h.isDefined(b[a.messageCode])?b[a.messageCode]:a.message,c+=a.style.substring(0,a.style.indexOf("\x3c/"))+(a.params?dojo.string.substitute(f,a.params):f)+a.style.substring(a.style.indexOf("\x3c/"));else if(e.isArray(a.message)){for(n=[];null!==(p=d.exec(a.style));)n.push(p.index);k=g="";m=l=0;q.forEach(a.message,function(c,d){0===d&&(g=a.style);f=h.isDefined(b[a.messageCode+
"_"+d])?b[a.messageCode+"_"+d]:c;m=n[d];k=a.params?dojo.string.substitute(f,a.params):f;g=g.substring(0,m+l)+k+g.substring(m+l);l=k.length},this);c+=g}});return c}});u("extend-esri")&&e.setObject("dijit.analysis.utils",d,z);return d});