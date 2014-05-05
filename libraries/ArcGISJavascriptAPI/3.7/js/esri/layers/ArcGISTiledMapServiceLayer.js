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
define("esri/layers/ArcGISTiledMapServiceLayer","dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/has dojo/io-query esri/kernel esri/urlUtils esri/SpatialReference esri/layers/TiledMapServiceLayer esri/layers/ArcGISMapServiceLayer esri/layers/TileInfo esri/layers/TimeInfo".split(" "),function(l,f,c,m,n,p,g,q,h,r,s,t,u,v){f=f([s,t],{declaredClass:"esri.layers.ArcGISTiledMapServiceLayer",_agolAttrs:["ocean_basemap","world_imagery","world_street_map","world_topo_map"],
constructor:function(a,b){b&&(b.roundrobin&&(l.deprecated(this.declaredClass+" : Constructor option 'roundrobin' deprecated. Use option 'tileServers'."),b.tileServers=b.roundrobin),this._setTileServers(b.tileServers),this._loadCallback=b.loadCallback);this._params=c.mixin({},this._url.query);this._initLayer=c.hitch(this,this._initLayer);var d=b&&b.resourceInfo;d?this._initLayer(d):(this._load=c.hitch(this,this._load),this._load())},_TILE_FORMATS:{PNG:"png",PNG8:"png",PNG24:"png",PNG32:"png",JPG:"jpg",
JPEG:"jpg",GIF:"gif"},_setTileServers:function(a){if(a&&0<a.length){this.tileServers=a;var b,d=a.length;for(b=0;b<d;b++)a[b]=h.urlToObject(a[b]).path}},_initLayer:function(a,b){this.inherited(arguments);this.resourceInfo=n.toJson(a);this.tileInfo=new u(a.tileInfo);!this.spatialReference&&this.tileInfo.spatialReference&&(this.spatialReference=new r(this.tileInfo.spatialReference.toJson()));this.isPNG32="PNG24"===this.tileInfo.format||"PNG32"===this.tileInfo.format;a.timeInfo&&(this.timeInfo=new v(a.timeInfo));
var d=this._url.path,k=this._loadCallback,f="file:"===window.location.protocol?"http:":window.location.protocol,e=d.match(/^https?\:\/\/(server|services)\.arcgisonline\.com\/arcgis\/rest\/services\/([^\/]+)\/mapserver/i),e=e&&e[2];if(!this.tileServers)if(a.tileServers)this._setTileServers(a.tileServers);else{var c=-1!==d.search(/^https?\:\/\/server\.arcgisonline\.com/i),g=-1!==d.search(/^https?\:\/\/services\.arcgisonline\.com/i);if(c||g)this._setTileServers([d,d.replace(c?/server\.arcgisonline/i:
/services\.arcgisonline/i,c?"services.arcgisonline":"server.arcgisonline")])}e&&-1!==m.indexOf(this._agolAttrs,e.toLowerCase())&&(this.hasAttributionData=!0,this.attributionDataUrl=this.attributionDataUrl||f+"//static.arcgis.com/attribution/"+e);this.loaded=!0;this.onLoad(this);k&&(delete this._loadCallback,k(this))},getTileUrl:function(a,b,d){var c=this.tileServers,f=this._getToken(),e=this._url.query;a=(c?c[b%c.length]:this._url.path)+"/tile/"+a+"/"+b+"/"+d;this._resampling&&(a+="?blankTile\x3dfalse");
e&&(a=this._resampling?a+("\x26"+g.objectToQuery(e)):a+("?"+g.objectToQuery(e)));if(f&&(!e||!e.token))a+=(-1===a.indexOf("?")?"?":"\x26")+"token\x3d"+f;a=this.addTimestampToURL(a);return h.addProxy(a)}});p("extend-esri")&&c.setObject("layers.ArcGISTiledMapServiceLayer",f,q);return f});