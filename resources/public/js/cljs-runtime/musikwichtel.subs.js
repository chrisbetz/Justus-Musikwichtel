goog.provide('musikwichtel.subs');
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","db","musikwichtel.subs/db",1392352317),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return db;
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,p__28724){
var vec__28725 = p__28724;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28725,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28725,(1),null);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key));
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","wall-clock-now","musikwichtel.subs/wall-clock-now",-1801085147),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"wall-clock-now","wall-clock-now",-1133762401).cljs$core$IFn$_invoke$arity$2(db,Date.now());
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","wall-clock-now","musikwichtel.subs/wall-clock-now",-1801085147)], null),(function (now,p__28731){
var vec__28733 = p__28731;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28733,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28733,(1),null);
var db = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","db","musikwichtel.subs/db",1392352317)], null)));
var p_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key));
return musikwichtel.shared.calculate_effective_ms(p_data,now);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","formatted-time","musikwichtel.subs/formatted-time",1999289514),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (p__28737,_){
var vec__28738 = p__28737;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28738,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28738,(1),null);
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player-ms","musikwichtel.subs/player-ms",1729469886),player_key], null));
}),(function (ms,_){
return musikwichtel.shared.format_time_ms(ms);
})], 0));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","is-running?","musikwichtel.subs/is-running?",-1079466802),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,p__28742){
var vec__28743 = p__28742;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28743,(0),null);
var player_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28743,(1),null);
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
}),(function (p__28748,_){
var vec__28749 = p__28748;
var p1_ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28749,(0),null);
var p2_ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28749,(1),null);
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
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,_){
return new cljs.core.Keyword(null,"current-player","current-player",-970625153).cljs$core$IFn$_invoke$arity$2(db,new cljs.core.Keyword(null,"player1","player1",-1491573636));
})], 0));

//# sourceMappingURL=musikwichtel.subs.js.map
