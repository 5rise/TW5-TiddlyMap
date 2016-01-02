/*\

title: $:/plugins/felixhayashi/tiddlymap/js/caretaker
type: application/javascript
module-type: startup

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var e=require("$:/plugins/felixhayashi/tiddlymap/js/config/vis").config;var t=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var i=require("$:/plugins/felixhayashi/tiddlymap/js/fixer").fixer;var a=require("$:/plugins/felixhayashi/tiddlymap/js/Adapter").Adapter;var r=require("$:/plugins/felixhayashi/tiddlymap/js/DialogManager").DialogManager;var s=require("$:/plugins/felixhayashi/tiddlymap/js/CallbackManager").CallbackManager;var l=require("$:/plugins/felixhayashi/tiddlymap/js/ViewAbstraction").ViewAbstraction;var d=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType").EdgeType;var p=require("$:/plugins/felixhayashi/tiddlymap/js/NodeType").NodeType;var n=require("$:/plugins/felixhayashi/vis/vis.js");var o=function(e){if(e.path)return;var t=e;t.path={pluginRoot:"$:/plugins/felixhayashi/tiddlymap",edgeTypes:"$:/plugins/felixhayashi/tiddlymap/graph/edgeTypes",nodeTypes:"$:/plugins/felixhayashi/tiddlymap/graph/nodeTypes",listEdgeTypes:"$:/plugins/felixhayashi/tiddlymap/graph/edgeTypes/tw-list:",fieldEdgeTypes:"$:/plugins/felixhayashi/tiddlymap/graph/edgeTypes/tw-field:",views:"$:/plugins/felixhayashi/tiddlymap/graph/views",options:"$:/plugins/felixhayashi/tiddlymap/config",dialogs:"$:/plugins/felixhayashi/tiddlymap/dialog",footers:"$:/plugins/felixhayashi/tiddlymap/dialogFooter",tempRoot:"$:/temp/tmap",tempStates:"$:/temp/tmap/state",tempPopups:"$:/temp/tmap/state/popup",localHolders:"$:/temp/tmap/holders"};var i=t.path;t.ref={defaultViewHolder:"$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder",graphBar:"$:/plugins/felixhayashi/tiddlymap/misc/advancedEditorBar",sysUserConf:"$:/plugins/felixhayashi/tiddlymap/config/sys/user",visUserConf:"$:/plugins/felixhayashi/tiddlymap/config/vis/user",welcomeFlag:"$:/plugins/felixhayashi/tiddlymap/flag/welcome",focusButton:"$:/plugins/felixhayashi/tiddlymap/misc/focusButton",sysMeta:"$:/plugins/felixhayashi/tiddlymap/misc/meta",liveTab:"$:/plugins/felixhayashi/tiddlymap/hook/liveTab",sidebarBreakpoint:"$:/themes/tiddlywiki/vanilla/metrics/sidebarbreakpoint"};t.misc={unknownEdgeLabel:"tmap:undefined",liveViewLabel:"Live View",defaultViewLabel:"Default"};t.config={sys:{field:{nodeLabel:"caption",nodeIcon:"icon",nodeInfo:"description",viewMarker:"isview"},liveTab:{fallbackView:t.misc.liveViewLabel},suppressedDialogs:{},edgeClickBehaviour:"manager",debug:"false",notifications:"true",editNodeOnCreate:"false",singleClickMode:"false",editorMenuBar:{showNeighScopeButton:"true",showScreenshotButton:"true"}}};t.filter={nodeTypes:"[prefix["+t.path.nodeTypes+"]]",edgeTypes:"[prefix["+t.path.edgeTypes+"]]",listEdgeTypes:"[prefix["+t.path.listEdgeTypes+"]]",fieldEdgeTypes:"[prefix["+t.path.fieldEdgeTypes+"]]",views:"["+t.config.sys.field.viewMarker+"[true]]"};t.filter.defaultEdgeFilter=t.filter.edgeTypes+"-[suffix[tw-body:link]]"+"-[suffix[tw-list:tags]]"+"-[suffix[tw-list:list]]";var a=t.selector={};var r="[all[tiddlers+shadows]!has[draft.of]]";a.allEdgeTypes=r+" +"+t.filter.edgeTypes;a.allEdgeTypesById=a.allEdgeTypes+" +[removeprefix["+i.edgeTypes+"/]]";a.allNodeTypes=r+" +"+t.filter.nodeTypes;a.allNodeTypesById=a.allNodeTypes+" +[removeprefix["+i.nodeTypes+"/]]";a.allViews=r+" +"+t.filter.views;a.allViewsByLabel=a.allViews+"+[removeprefix["+i.views+"/]]";a.allPotentialNodes="[all[tiddlers]!is[system]!has[draft.of]]";a.allListEdgeStores=r+" +"+t.filter.listEdgeTypes+" +[removeprefix["+i.listEdgeTypes+"]]";a.allFieldEdgeStores=r+" +"+t.filter.fieldEdgeTypes+" +[removeprefix["+i.fieldEdgeTypes+"]]"};var f=function(i){var a=i;o(a);if(!a.config)a.config=t.getDataMap();a.config.sys=t.merge(a.config.sys,t.unflatten($tw.wiki.getTiddlerData(a.ref.sysUserConf)));a.config.vis=t.merge({},e,t.parseFieldData(a.ref.visUserConf));if(!a.field)a.field=t.getDataMap();$tw.utils.extend(a.field,a.config.sys.field)};var g=function(e){$tw.tmap.start("Attaching Indeces");if(!e.indeces){e.indeces={};var t=$tw.tmap.opt.path.pluginRoot;e.indeces.tmapTiddlers=$tw.wiki.getPluginInfo(t).tiddlers}var i=$tw.wiki.allTitles();m(e.indeces,i);u(e.indeces);y(e.indeces);$tw.tmap.stop("Attaching Indeces")};var m=function(e,a){e=e||$tw.tmap.indeces;a=a||$tw.wiki.allTitles();i.fixId();var r=e.tById={};var s=e.idByT={};$tw.wiki.each(function(e,i){if(t.isSystemOrDraft(e))return;var a=e.fields["tmap.id"];if(!a){a=t.genUUID();t.setField(e,"tmap.id",a)}r[a]=i;s[i]=a})};var u=function(e){e=e||$tw.tmap.indeces;var i=$tw.tmap.opt.path.nodeTypes;var a=e.glNTy=[];$tw.wiki.eachTiddlerPlusShadows(function(e,r){if(t.startsWith(r,i)){a.push(new p(r))}});a.sort(function(e,t){return e.priority-t.priority})};var y=function(e){e=e||$tw.tmap.indeces;var i=$tw.tmap.opt.path.edgeTypes;var a=$tw.tmap.opt.path.listEdgeTypes;var r=$tw.tmap.opt.path.fieldEdgeTypes;var s=e.allETy=t.getDataMap();var l=e.liETy=t.getDataMap();var p=e.fiETy=t.getDataMap();var n=e.maETyFiNa=t.getDataMap();$tw.wiki.eachTiddlerPlusShadows(function(e,o){if(t.startsWith(o,i)){var f=new d(o);s[f.id]=f;if(t.startsWith(o,a)){l[f.id]=f;n[f.getId(true)]=true}else if(t.startsWith(o,r)){p[f.id]=f;n[f.getId(true)]=true}}})};var w=function(e){};var c=function(e){var i=e;var a=function(){};if(t.isTrue($tw.tmap.opt.config.sys.debug,false)&&console){i.logger=function(){if(arguments.length<2)return;var e=Array.prototype.slice.call(arguments);var t=e.shift(e);var i=console.hasOwnProperty(t)?t:"debug";console[i].apply(console,e)};i.start=function(e){console.time("[timer] "+e)};i.stop=function(e){console.timeEnd("[timer] "+e)}}else{i.logger=i.start=i.stop=a}i.notify=t.isTrue($tw.tmap.opt.config.sys.notifications)?t.notify:a};var h=function(){for(var e=$tw.tmap.registry.length;e--;){var t=$tw.tmap.registry[e];if(t.isZombieWidget()){$tw.tmap.logger("warn","A graph has been removed.");t.destruct();$tw.tmap.registry.splice(e,1)}}};var v=function(e){var i=e.fields["tmap.id"];if(!i)return;var a=$tw.tmap.opt;var r=t.getTiddlersWithField("tmap.id",i,{limit:2});delete r[e.fields.title];var s=Object.keys(r)[0];if(s){var l={param:{changedTiddler:e.fields.title,existingTiddler:s,id:i}};$tw.tmap.dialogManager.open("dublicateIdInfo",l)}if(s){t.setField(e,"tmap.edges",undefined);$tw.tmap.adapter.assignId(e,true)}};var $=function(e){if(!e)e=$tw.tmap;if(!e.opt)e.opt=t.getDataMap();f(e.opt);c(e,e.opt);$tw.tmap.logger("warn","Rebuilt globals")};var T=null;var x=function(e){if(e["$:/HistoryList"]){var i=t.getField("$:/HistoryList","current-tiddler")}else if(e["$:/temp/focussedTiddler"]){var i=t.getField("$:/temp/focussedTiddler","text")}if(i!=null&&T!==i){T=i;t.setField("$:/temp/tmap/currentTiddler","text",i)}};var b=function(e){if(t.isTrue($tw.tmap.opt.config.sys.debug,false)){for(var i in e){if(e[i].deleted){$tw.tmap.logger("warn","Tiddler deleted:",i)}else{$tw.tmap.logger("warn","Tiddler modified:",i,t.getTiddler(i))}}}};var k=function(){var e=$tw.tmap.opt.path.tempPopups;window.addEventListener("click",function(i){var a=t.getTiddlersByPrefix(e);for(var r=a.length;r--;){if(t.getText(a[r]))break}if(r===-1)return;if(!$tw.utils.hasClass(i.target,"tc-drop-down")&&!t.getAncestorWithClass(i.target,"tc-drop-down")){for(var r=a.length;r--;){t.setText(a[r],"")}}},false)};var E=function(e){var i=0;var a={};a[$tw.tmap.opt.path.nodeTypes]=u;a[$tw.tmap.opt.path.edgeTypes]=y;a[$tw.tmap.opt.path.options]=$;$tw.wiki.addEventListener("change",function(r){$tw.tmap.start("Caretaker handling changes");$tw.tmap.logger("warn","=== Refresh "+i++ +" ===");b(r);e.handleChanges(r);var s=[];for(var l in r){var d=t.getTiddler(l);if(t.isDraft(d))continue;if($tw.wiki.isSystemTiddler(l)){for(var p in a){if(t.startsWith(l,p)&&!s[p]){$tw.tmap.logger("warn","Rebuilding index:",p);a[p].call(this);s[p]=true;break}}continue}var d=t.getTiddler(l);if(d){v(d);$tw.tmap.adapter.assignId(d)}else{var n=$tw.tmap.indeces.idByT[l];if(!n){$tw.tmap.logger("warn","Ignoring Tiddler",l,"without id; Assuming draft");continue}var o=t.getTiddlerWithField("tmap.id",n);if(o){$tw.tmap.logger("warn","Tiddler",l,"renamed into",o)}else{$tw.tmap.logger("warn","Tiddler",l,"removed");$tw.tmap.adapter.deleteNode(n)}}}x(r);$tw.tmap.stop("Caretaker handling changes")})};var M=function(){t.deleteByPrefix("$:/temp/felixhayashi");t.deleteByPrefix("$:/temp/tiddlymap");t.deleteByPrefix("$:/temp/tmap")};var B=function(){var e=$tw.tmap.opt.config.sys.defaultView;if(e){t.setField($tw.tmap.opt.ref.defaultViewHolder,"text",e)}};var D=function(){if(t.tiddlerExists($tw.tmap.opt.ref.sysMeta))return;$tw.tmap.logger("warn","Creating meta file");var e=$tw.wiki.getTiddler($tw.tmap.opt.path.pluginRoot);$tw.wiki.setTiddlerData($tw.tmap.opt.ref.sysMeta,{originalVersion:e.fields.version,dataStructureState:"0.6.9",showWelcomeMessage:true})};exports.name="tmap.caretaker";exports.platforms=["browser"];exports.after=["startup"];exports.before=["rootwidget"];exports.synchronous=true;exports.startup=function(){$tw.tmap=t.getDataMap();$tw.tmap.utils=t;$tw.tmap.keycharm=n.keycharm;$tw.tmap.NodeType=p;$tw.tmap.EdgeType=d;$tw.tmap.ViewAbstraction=l;$($tw.tmap);D();M();g($tw.tmap);B();$tw.tmap.adapter=new a;i.fix();$tw.tmap.callbackManager=new s;$tw.tmap.dialogManager=new r($tw.tmap.callbackManager);$tw.tmap.registry=[];window.setInterval(h,5e3);E($tw.tmap.callbackManager);k();$tw.tmap.logger("warn","TiddlyMap's caretaker successfully started")}})();