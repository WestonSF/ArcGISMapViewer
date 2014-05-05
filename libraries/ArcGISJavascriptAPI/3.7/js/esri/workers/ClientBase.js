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
define("esri/workers/ClientBase",["esri/sniff","esri/kernel","dojo/_base/declare","dojo/Deferred","dojo/_base/lang"],function(f,g,d,h,e){d=d(null,{declaredClass:"esri.workers.ClientBase",worker:null,returnDeferreds:!1,_queue:null,constructor:function(a,b){a&&this.setWorker(a);this.returnDeferreds=!!b;this._queue={}},setWorker:function(a){var b=require.toUrl(a);b?(b.match(/\.js$/)||(b+=".js"),this.worker&&(a=this.worker,a.removeEventListener("message",e.hitch(this,this._acceptMessage),!1),a.removeEventListener("error",
e.hitch(this,this._errorMessage),!1),this.worker=null),this.worker=new Worker(b),this.worker.addEventListener("message",e.hitch(this,this._acceptMessage),!1),this.worker.addEventListener("error",e.hitch(this,this._errorMessage),!1)):console.error("can not resolve worker path:",a)},postMessage:function(a,b){if(a instanceof Array||"object"!=typeof a)a={data:a};var c=+new Date;a.qid=c;this._queue[c]=new h;this.worker.postMessage(a,b);return this.returnDeferreds?this._queue[c]:this._queue[c].promise},
terminate:function(){var a=Object.keys(this._queue);this.worker.terminate();for(var b=a.length-1;0<=b;b--)this._queue[a[b]].cancel("terminated"),delete this._queue[a[b]]},_acceptMessage:function(a){var b=a.data,c=b.qid;if(c&&c in this._queue){var d=this._queue[c];"progress"==b.status?d.progress(a):("error"==b.status?d.reject(a):d.resolve(a),delete this._queue[c])}},_errorMessage:function(a){this.onerror||this.onError?this.onerror?this.onerror(a):this.onError(a):console.log("Worker Error: "+a.message+
"\nIn "+a.filename+" on "+a.lineno)}});f("extend-esri")&&(g.ClientBase=d);return d});