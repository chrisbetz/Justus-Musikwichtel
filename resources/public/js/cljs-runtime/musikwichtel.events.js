goog.provide('musikwichtel.events');
musikwichtel.events.local_storage_key = "wichtel-wetteifern-cache";
musikwichtel.events.save_cache = (function musikwichtel$events$save_cache(db){
try{var data = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(db)], null);
var json = JSON.stringify(cljs.core.clj__GT_js(data));
return localStorage.setItem(musikwichtel.events.local_storage_key,json);
}catch (e24691){var _ = e24691;
return null;
}});
musikwichtel.events.load_cache = (function musikwichtel$events$load_cache(){
try{var temp__5823__auto__ = localStorage.getItem(musikwichtel.events.local_storage_key);
if(cljs.core.truth_(temp__5823__auto__)){
var item = temp__5823__auto__;
return clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(JSON.parse(item)));
} else {
return null;
}
}catch (e24700){var _ = e24700;
return null;
}});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","initialize-db","musikwichtel.events/initialize-db",-705450736),(function (_,___$1){
var cached = musikwichtel.events.load_cache();
var G__24705 = musikwichtel.db.default_db;
var G__24705__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(cached))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24705,new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(cached)):G__24705);
if(cljs.core.truth_(new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(cached))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24705__$1,new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(cached));
} else {
return G__24705__$1;
}
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","tick","musikwichtel.events/tick",-2047110064),(function (db,p__24710){
var vec__24711 = p__24710;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24711,(0),null);
var now = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24711,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"wall-clock-now","wall-clock-now",-1133762401),now);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716),(function (_,___$1){
fetch("/api/state").then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data))], null));
} else {
return null;
}
})).catch((function (___$2){
return null;
}));

return cljs.core.PersistentArrayMap.EMPTY;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),(function (db,p__24714){
var vec__24715 = p__24714;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24715,(0),null);
var server_data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24715,(1),null);
if(cljs.core.not(server_data)){
return db;
} else {
var updated = (function (){var G__24722 = db;
var G__24722__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(server_data))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24722,new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(server_data)):G__24722);
var G__24722__$2 = (cljs.core.truth_(new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(server_data))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24722__$1,new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(server_data)):G__24722__$1);
var G__24722__$3 = ((cljs.core.contains_QMARK_(server_data,new cljs.core.Keyword(null,"current-player","current-player",-970625153)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24722__$2,new cljs.core.Keyword(null,"current-player","current-player",-970625153),(function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(server_data);
if(cljs.core.truth_(temp__5823__auto__)){
var cp = temp__5823__auto__;
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cp);
} else {
return null;
}
})()):G__24722__$2);
var G__24722__$4 = ((cljs.core.contains_QMARK_(server_data,new cljs.core.Keyword(null,"garden-user","garden-user",-93754696)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24722__$3,new cljs.core.Keyword(null,"garden-user","garden-user",-93754696),new cljs.core.Keyword(null,"garden-user","garden-user",-93754696).cljs$core$IFn$_invoke$arity$1(server_data)):G__24722__$3);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__24722__$4,new cljs.core.Keyword(null,"server-synced?","server-synced?",1836461323),true);

})();
musikwichtel.events.save_cache(updated);

return updated;
}
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","close-login-modal","musikwichtel.events/close-login-modal",-928541100),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),false);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","dev-login-impersonate","musikwichtel.events/dev-login-impersonate",1635816691),(function (_,p__24727){
var vec__24728 = p__24727;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24728,(0),null);
var username = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24728,(1),null);
var disp_name_24767 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(username,"quentin"))?"Quentin":"Kilian");
var body_24768 = ["username=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(username)),"&name=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(disp_name_24767)),"&email=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent([cljs.core.str.cljs$core$IFn$_invoke$arity$1(username),"@application.garden"].join('')))].join('');
fetch("/.application.garden/garden-id/login",({"method": "POST", "headers": ({"Content-Type": "application/x-www-form-urlencoded"}), "body": body_24768})).then((function (___$2){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","close-login-modal","musikwichtel.events/close-login-modal",-928541100)], null));
})).catch((function (___$2){
return null;
}));

return cljs.core.PersistentArrayMap.EMPTY;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","logout","musikwichtel.events/logout",742131353),(function (p__24732,_){
var map__24733 = p__24732;
var map__24733__$1 = cljs.core.__destructure_map(map__24733);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24733__$1,new cljs.core.Keyword(null,"db","db",993250759));
var optimistic_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(db,new cljs.core.Keyword(null,"current-player","current-player",-970625153),null,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"garden-user","garden-user",-93754696),null], 0));
fetch("/api/logout",({"method": "POST"})).then((function (___$1){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","start-timer","musikwichtel.events/start-timer",-1872988888),(function (p__24734,p__24735){
var map__24736 = p__24734;
var map__24736__$1 = cljs.core.__destructure_map(map__24736);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24736__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__24737 = p__24735;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24737,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24737,(1),null);
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,pk)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
var now = Date.now();
var optimistic_db = cljs.core.assoc_in(cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"running?","running?",-257884763)], null),true),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613)], null),now);
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/start",({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk)}))})).then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));

if(cljs.core.truth_((function (){var G__24741 = resp.status;
var fexpr__24740 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(401),null,(403),null], null), null);
return (fexpr__24740.cljs$core$IFn$_invoke$arity$1 ? fexpr__24740.cljs$core$IFn$_invoke$arity$1(G__24741) : fexpr__24740.call(null, G__24741));
})())){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
} else {
}

return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data))], null));
} else {
return null;
}
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);

}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","stop-timer","musikwichtel.events/stop-timer",-1366705560),(function (p__24742,p__24743){
var map__24744 = p__24742;
var map__24744__$1 = cljs.core.__destructure_map(map__24744);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24744__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__24745 = p__24743;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24745,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24745,(1),null);
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,pk)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
var now = Date.now();
var p_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,pk);
var total = new cljs.core.Keyword(null,"total-ms","total-ms",889647655).cljs$core$IFn$_invoke$arity$2(p_data,(0));
var start = new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613).cljs$core$IFn$_invoke$arity$1(p_data);
var elapsed = (cljs.core.truth_((function (){var and__5000__auto__ = start;
if(cljs.core.truth_(and__5000__auto__)){
return (now > start);
} else {
return and__5000__auto__;
}
})())?(now - start):(0));
var new_total = (total + elapsed);
var optimistic_db = cljs.core.assoc_in(cljs.core.assoc_in(cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"running?","running?",-257884763)], null),false),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"total-ms","total-ms",889647655)], null),new_total),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613)], null),null);
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/stop",({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk)}))})).then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));

if(cljs.core.truth_((function (){var G__24749 = resp.status;
var fexpr__24748 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(401),null,(403),null], null), null);
return (fexpr__24748.cljs$core$IFn$_invoke$arity$1 ? fexpr__24748.cljs$core$IFn$_invoke$arity$1(G__24749) : fexpr__24748.call(null, G__24749));
})())){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
} else {
}

return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data))], null));
} else {
return null;
}
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);

}
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","open-reset-modal","musikwichtel.events/open-reset-modal",40575820),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),true);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","cancel-reset","musikwichtel.events/cancel-reset",1521559430),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),false);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","confirm-reset","musikwichtel.events/confirm-reset",1927624633),(function (p__24754,_){
var map__24755 = p__24754;
var map__24755__$1 = cljs.core.__destructure_map(map__24755);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24755__$1,new cljs.core.Keyword(null,"db","db",993250759));
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
if(cljs.core.not(current)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),false),new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
var p1_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"name","name",1843675177)], null),"Oboe");
var p2_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"name","name",1843675177)], null),"Klavier");
var optimistic_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),false),new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),p1_name,new cljs.core.Keyword(null,"total-ms","total-ms",889647655),(0),new cljs.core.Keyword(null,"running?","running?",-257884763),false,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613),null], null)),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),p2_name,new cljs.core.Keyword(null,"total-ms","total-ms",889647655),(0),new cljs.core.Keyword(null,"running?","running?",-257884763),false,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613),null], null));
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/reset",({"method": "POST", "headers": ({"Content-Type": "application/json"})})).then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));

if(cljs.core.truth_((function (){var G__24758 = resp.status;
var fexpr__24757 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(401),null,(403),null], null), null);
return (fexpr__24757.cljs$core$IFn$_invoke$arity$1 ? fexpr__24757.cljs$core$IFn$_invoke$arity$1(G__24758) : fexpr__24757.call(null, G__24758));
})())){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
} else {
}

return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data))], null));
} else {
return null;
}
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","update-name","musikwichtel.events/update-name",904505840),(function (p__24759,p__24760){
var map__24761 = p__24759;
var map__24761__$1 = cljs.core.__destructure_map(map__24761);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24761__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__24762 = p__24760;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24762,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24762,(1),null);
var new_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24762,(2),null);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
var trimmed = cljs.core.str.cljs$core$IFn$_invoke$arity$1(new_name).trim();
if(((cljs.core.empty_QMARK_(trimmed)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,pk)))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),db], null);
} else {
var optimistic_db = cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"name","name",1843675177)], null),trimmed);
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/name",({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk), "name": trimmed}))})).then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),clojure.walk.keywordize_keys(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data))], null));
} else {
return null;
}
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);
}
}));

//# sourceMappingURL=musikwichtel.events.js.map
