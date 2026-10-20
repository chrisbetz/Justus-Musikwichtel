goog.provide('musikwichtel.events');
musikwichtel.events.local_storage_key = "wichtel-wetteifern-cache";
musikwichtel.events.save_cache = (function musikwichtel$events$save_cache(db){
try{var data = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword(null,"current-player","current-player",-970625153),new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db)], null);
var json = JSON.stringify(cljs.core.clj__GT_js(data));
return localStorage.setItem(musikwichtel.events.local_storage_key,json);
}catch (e39794){var _ = e39794;
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
}catch (e39795){var _ = e39795;
return null;
}});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","initialize-db","musikwichtel.events/initialize-db",-705450736),(function (_,___$1){
var cached = musikwichtel.events.load_cache();
var G__39796 = musikwichtel.db.default_db;
var G__39796__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(cached))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39796,new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(cached)):G__39796);
var G__39796__$2 = (cljs.core.truth_(new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(cached))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39796__$1,new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(cached)):G__39796__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(cached))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39796__$2,new cljs.core.Keyword(null,"current-player","current-player",-970625153),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(cached)));
} else {
return G__39796__$2;
}
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","tick","musikwichtel.events/tick",-2047110064),(function (db,p__39797){
var vec__39798 = p__39797;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39798,(0),null);
var now = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39798,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"wall-clock-now","wall-clock-now",-1133762401),now);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716),(function (_,___$1){
var query_39834 = window.location.search;
fetch(["/api/state",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_39834)].join('')).then((function (resp){
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
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","state-received","musikwichtel.events/state-received",21156433),(function (db,p__39801){
var vec__39802 = p__39801;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39802,(0),null);
var server_data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39802,(1),null);
if(cljs.core.not(server_data)){
return db;
} else {
var updated = (function (){var G__39805 = db;
var G__39805__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(server_data))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39805,new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"player1","player1",-1491573636).cljs$core$IFn$_invoke$arity$1(server_data)):G__39805);
var G__39805__$2 = (cljs.core.truth_(new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(server_data))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39805__$1,new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"player2","player2",-226422775).cljs$core$IFn$_invoke$arity$1(server_data)):G__39805__$1);
var G__39805__$3 = ((cljs.core.contains_QMARK_(server_data,new cljs.core.Keyword(null,"current-player","current-player",-970625153)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39805__$2,new cljs.core.Keyword(null,"current-player","current-player",-970625153),(function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(server_data);
if(cljs.core.truth_(temp__5823__auto__)){
var cp = temp__5823__auto__;
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cp);
} else {
return null;
}
})()):G__39805__$2);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39805__$3,new cljs.core.Keyword(null,"server-synced?","server-synced?",1836461323),true);

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
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","login","musikwichtel.events/login",1257900447),(function (p__39806,p__39807){
var map__39808 = p__39806;
var map__39808__$1 = cljs.core.__destructure_map(map__39808);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39808__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__39809 = p__39807;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39809,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39809,(1),null);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
var optimistic_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"current-player","current-player",-970625153),pk),new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),false);
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/login",({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk)}))})).then((function (resp){
if(cljs.core.truth_(resp.ok)){
return resp.json();
} else {
return null;
}
})).then((function (data){
if(cljs.core.truth_(data)){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));
} else {
return null;
}
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","logout","musikwichtel.events/logout",742131353),(function (p__39812,_){
var map__39813 = p__39812;
var map__39813__$1 = cljs.core.__destructure_map(map__39813);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39813__$1,new cljs.core.Keyword(null,"db","db",993250759));
var optimistic_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"current-player","current-player",-970625153),null),new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true);
musikwichtel.events.save_cache(optimistic_db);

fetch("/api/logout",({"method": "POST"})).then((function (___$1){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));
})).catch((function (___$1){
return null;
}));

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),optimistic_db], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","start-timer","musikwichtel.events/start-timer",-1872988888),(function (p__39814,p__39815){
var map__39816 = p__39814;
var map__39816__$1 = cljs.core.__destructure_map(map__39816);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39816__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__39817 = p__39815;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39817,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39817,(1),null);
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
if((current == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,new cljs.core.Keyword(null,"both","both",-393648840))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,pk)))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
var now = Date.now();
var optimistic_db = cljs.core.assoc_in(cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"running?","running?",-257884763)], null),true),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613)], null),now);
musikwichtel.events.save_cache(optimistic_db);

var query_39835 = window.location.search;
fetch(["/api/start",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_39835)].join(''),({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk)}))})).then((function (resp){
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
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","stop-timer","musikwichtel.events/stop-timer",-1366705560),(function (p__39820,p__39821){
var map__39822 = p__39820;
var map__39822__$1 = cljs.core.__destructure_map(map__39822);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39822__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__39823 = p__39821;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39823,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39823,(1),null);
var current = new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
if((current == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590),true)], null);
} else {
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,new cljs.core.Keyword(null,"both","both",-393648840))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current,pk)))){
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

var query_39837 = window.location.search;
fetch(["/api/stop",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_39837)].join(''),({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk)}))})).then((function (resp){
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
}
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","open-reset-modal","musikwichtel.events/open-reset-modal",40575820),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),true);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","cancel-reset","musikwichtel.events/cancel-reset",1521559430),(function (db,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),false);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","confirm-reset","musikwichtel.events/confirm-reset",1927624633),(function (p__39826,_){
var map__39827 = p__39826;
var map__39827__$1 = cljs.core.__destructure_map(map__39827);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39827__$1,new cljs.core.Keyword(null,"db","db",993250759));
var p1_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"name","name",1843675177)], null),"Oboe");
var p2_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"name","name",1843675177)], null),"Klavier");
var optimistic_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408),false),new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),p1_name,new cljs.core.Keyword(null,"total-ms","total-ms",889647655),(0),new cljs.core.Keyword(null,"running?","running?",-257884763),false,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613),null], null)),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),p2_name,new cljs.core.Keyword(null,"total-ms","total-ms",889647655),(0),new cljs.core.Keyword(null,"running?","running?",-257884763),false,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613),null], null));
musikwichtel.events.save_cache(optimistic_db);

var query_39838 = window.location.search;
fetch(["/api/reset",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_39838)].join(''),({"method": "POST", "headers": ({"Content-Type": "application/json"})})).then((function (resp){
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
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("musikwichtel.events","update-name","musikwichtel.events/update-name",904505840),(function (p__39828,p__39829){
var map__39830 = p__39828;
var map__39830__$1 = cljs.core.__destructure_map(map__39830);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39830__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__39831 = p__39829;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39831,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39831,(1),null);
var new_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39831,(2),null);
var pk = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key);
var trimmed = cljs.core.str.cljs$core$IFn$_invoke$arity$1(new_name).trim();
if(cljs.core.empty_QMARK_(trimmed)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),db], null);
} else {
var optimistic_db = cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pk,new cljs.core.Keyword(null,"name","name",1843675177)], null),trimmed);
musikwichtel.events.save_cache(optimistic_db);

var query_39839 = window.location.search;
fetch(["/api/name",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_39839)].join(''),({"method": "POST", "headers": ({"Content-Type": "application/json"}), "body": JSON.stringify(({"player": cljs.core.name(pk), "name": trimmed}))})).then((function (resp){
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
