goog.provide('musikwichtel.subs');
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","db","musikwichtel.subs/db",1392352317),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return db;
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,p__39753){
var vec__39754 = p__39753;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39754,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39754,(1),null);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","wall-clock-now","musikwichtel.subs/wall-clock-now",-1801085147),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"wall-clock-now","wall-clock-now",-1133762401).cljs$core$IFn$_invoke$arity$2(db,Date.now());
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","wall-clock-now","musikwichtel.subs/wall-clock-now",-1801085147)], null),(function (now,p__39757){
var vec__39758 = p__39757;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39758,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39758,(1),null);
var db = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","db","musikwichtel.subs/db",1392352317)], null)));
var p_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key));
return musikwichtel.shared.calculate_effective_ms(p_data,now);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","formatted-time","musikwichtel.subs/formatted-time",1999289514),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (p__39761,_){
var vec__39762 = p__39761;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39762,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39762,(1),null);
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),player_key], null));
}),(function (ms,_){
return musikwichtel.shared.format_time_ms(ms);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","is-running?","musikwichtel.subs/is-running?",-1079466802),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,p__39765){
var vec__39766 = p__39765;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39766,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39766,(1),null);
return cljs.core.boolean$(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key),new cljs.core.Keyword(null,"running?","running?",-257884763)], null)));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","village-active?","musikwichtel.subs/village-active?",-1683605754),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
var or__5002__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"running?","running?",-257884763)], null));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"running?","running?",-257884763)], null));
}
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","leader-info","musikwichtel.subs/leader-info",-1783931939),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (_,___$1){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),new cljs.core.Keyword(null,"player1","player1",-1491573636)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),new cljs.core.Keyword(null,"player2","player2",-226422775)], null))], null);
}),(function (p__39769,_){
var vec__39770 = p__39769;
var p1_ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39770,(0),null);
var p2_ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39770,(1),null);
return musikwichtel.shared.determine_leader((function (){var or__5002__auto__ = p1_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),(function (){var or__5002__auto__ = p2_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})());
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","show-reset-modal?","musikwichtel.subs/show-reset-modal?",500265214),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return cljs.core.boolean$(new cljs.core.Keyword(null,"show-reset-modal?","show-reset-modal?",1167456408).cljs$core$IFn$_invoke$arity$1(db));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","show-login-modal?","musikwichtel.subs/show-login-modal?",1311513668),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return cljs.core.boolean$(new cljs.core.Keyword(null,"show-login-modal?","show-login-modal?",636069590).cljs$core$IFn$_invoke$arity$1(db));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$1(db);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","logged-in?","musikwichtel.subs/logged-in?",-526817467),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071)], null),(function (current_player,_){
return (!((current_player == null)));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","can-control?","musikwichtel.subs/can-control?",985880950),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071)], null),(function (current_player,p__39773){
var vec__39774 = p__39773;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39774,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39774,(1),null);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_player,new cljs.core.Keyword(null,"both","both",-393648840))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_player,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key))));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","gauge-display-info","musikwichtel.subs/gauge-display-info",1391558926),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (_,___$1){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","leader-info","musikwichtel.subs/leader-info",-1783931939)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),new cljs.core.Keyword(null,"player1","player1",-1491573636)], null)),re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),new cljs.core.Keyword(null,"player2","player2",-226422775)], null))], null);
}),(function (p__39777,_){
var vec__39778 = p__39777;
var leader_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39778,(0),null);
var current_player = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39778,(1),null);
var p1_data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39778,(2),null);
var p2_data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39778,(3),null);
var p1_name = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1_data);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Oboe";
}
})();
var p2_name = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p2_data);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Klavier";
}
})();
var leader = new cljs.core.Keyword(null,"leader","leader",1888892947).cljs$core$IFn$_invoke$arity$1(leader_info);
var diff_str = new cljs.core.Keyword(null,"diff-formatted","diff-formatted",-1390625225).cljs$core$IFn$_invoke$arity$2(leader_info,"00:00:00");
var needle_angle = (function (){var G__39781 = current_player;
var G__39781__$1 = (((G__39781 instanceof cljs.core.Keyword))?G__39781.fqn:null);
switch (G__39781__$1) {
case "player1":
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player1","player1",-1491573636))){
return Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player2","player2",-226422775))){
return (- Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0))));
} else {
return (0);
}
}

break;
case "player2":
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player2","player2",-226422775))){
return Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player1","player1",-1491573636))){
return (- Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0))));
} else {
return (0);
}
}

break;
default:
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player1","player1",-1491573636))){
return Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0)));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(leader,new cljs.core.Keyword(null,"player2","player2",-226422775))){
return Math.abs(new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_info,(0)));
} else {
return (0);
}
}

}
})();
var nice_name = (function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"nice-player","nice-player",1802351463).cljs$core$IFn$_invoke$arity$1(leader_info);
if(cljs.core.truth_(temp__5823__auto__)){
var np = temp__5823__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(np,new cljs.core.Keyword(null,"player1","player1",-1491573636))){
return p1_name;
} else {
return p2_name;
}
} else {
return null;
}
})();
var naughty_name = (function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"naughty-player","naughty-player",601676668).cljs$core$IFn$_invoke$arity$1(leader_info);
if(cljs.core.truth_(temp__5823__auto__)){
var np = temp__5823__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(np,new cljs.core.Keyword(null,"player1","player1",-1491573636))){
return p1_name;
} else {
return p2_name;
}
} else {
return null;
}
})();
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"needle-angle","needle-angle",-96984331),needle_angle,new cljs.core.Keyword(null,"leader","leader",1888892947),leader,new cljs.core.Keyword(null,"diff-str","diff-str",-384856317),diff_str,new cljs.core.Keyword(null,"nice-name","nice-name",-1207162314),nice_name,new cljs.core.Keyword(null,"naughty-name","naughty-name",1120584922),naughty_name,new cljs.core.Keyword(null,"current-player","current-player",-970625153),current_player,new cljs.core.Keyword(null,"p1-name","p1-name",-626214840),p1_name,new cljs.core.Keyword(null,"p2-name","p2-name",-1197928543),p2_name], null);
})], 0));

//# sourceMappingURL=musikwichtel.subs.js.map
