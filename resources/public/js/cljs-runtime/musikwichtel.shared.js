goog.provide('musikwichtel.shared');
musikwichtel.shared.pad_zeros = (function musikwichtel$shared$pad_zeros(n,len){
var s = cljs.core.str.cljs$core$IFn$_invoke$arity$1(n);
if((((s).length) >= len)){
return s;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((len - ((s).length)),"0"))),s].join('');
}
});
/**
 * Converts total milliseconds into HH:MM:SS string.
 * Never wraps at 24 hours; formats 100+ hours correctly.
 * No milliseconds displayed.
 */
musikwichtel.shared.format_time_ms = (function musikwichtel$shared$format_time_ms(total_ms){
var safe_ms = (function (){var x__5087__auto__ = (0);
var y__5088__auto__ = (function (){var or__5002__auto__ = total_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})();
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
var total_seconds = cljs.core.quot(safe_ms,(1000));
var seconds = cljs.core.rem(total_seconds,(60));
var total_minutes = cljs.core.quot(total_seconds,(60));
var minutes = cljs.core.rem(total_minutes,(60));
var hours = cljs.core.quot(total_minutes,(60));
return [musikwichtel.shared.pad_zeros(hours,(2)),":",musikwichtel.shared.pad_zeros(minutes,(2)),":",musikwichtel.shared.pad_zeros(seconds,(2))].join('');
});
/**
 * Calculates current accumulated milliseconds for a player given current wall-clock time.
 */
musikwichtel.shared.calculate_effective_ms = (function musikwichtel$shared$calculate_effective_ms(player_data,current_wall_ts){
var map__39695 = player_data;
var map__39695__$1 = cljs.core.__destructure_map(map__39695);
var total_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39695__$1,new cljs.core.Keyword(null,"total-ms","total-ms",889647655));
var running_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39695__$1,new cljs.core.Keyword(null,"running?","running?",-257884763));
var start_ts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39695__$1,new cljs.core.Keyword(null,"start-ts","start-ts",-1114082613));
var base_ms = (function (){var or__5002__auto__ = total_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})();
if(cljs.core.truth_((function (){var and__5000__auto__ = running_QMARK_;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = start_ts;
if(cljs.core.truth_(and__5000__auto____$1)){
var and__5000__auto____$2 = current_wall_ts;
if(cljs.core.truth_(and__5000__auto____$2)){
return (current_wall_ts > start_ts);
} else {
return and__5000__auto____$2;
}
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
return (base_ms + (current_wall_ts - start_ts));
} else {
return base_ms;
}
});
/**
 * Returns leader map comparing player1 and player2 ms.
 * :leader is :player1, :player2, or :tie.
 * :nice-player is the player with more practice time (or nil if tie).
 * :naughty-player is the player with less practice time (or nil if tie).
 * :angle-deg ranges from -45 (p1 leading) to +45 (p2 leading), 0 for tie.
 */
musikwichtel.shared.determine_leader = (function musikwichtel$shared$determine_leader(p1_ms,p2_ms){
var diff = ((function (){var or__5002__auto__ = p2_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})() - (function (){var or__5002__auto__ = p1_ms;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})());
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(diff,(0))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"leader","leader",1888892947),new cljs.core.Keyword(null,"tie","tie",-487201694),new cljs.core.Keyword(null,"nice-player","nice-player",1802351463),null,new cljs.core.Keyword(null,"naughty-player","naughty-player",601676668),null,new cljs.core.Keyword(null,"diff-ms","diff-ms",232894864),(0),new cljs.core.Keyword(null,"diff-formatted","diff-formatted",-1390625225),"00:00:00",new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144),(0)], null);
} else {
if((diff > (0))){
var capped = (function (){var x__5090__auto__ = 1.0;
var y__5091__auto__ = (diff / 1800000.0);
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"leader","leader",1888892947),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"nice-player","nice-player",1802351463),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"naughty-player","naughty-player",601676668),new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"diff-ms","diff-ms",232894864),diff,new cljs.core.Keyword(null,"diff-formatted","diff-formatted",-1390625225),musikwichtel.shared.format_time_ms(diff),new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144),(capped * 45.0)], null);
} else {
var abs_diff = (- diff);
var capped = (function (){var x__5090__auto__ = 1.0;
var y__5091__auto__ = (abs_diff / 1800000.0);
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"leader","leader",1888892947),new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"nice-player","nice-player",1802351463),new cljs.core.Keyword(null,"player1","player1",-1491573636),new cljs.core.Keyword(null,"naughty-player","naughty-player",601676668),new cljs.core.Keyword(null,"player2","player2",-226422775),new cljs.core.Keyword(null,"diff-ms","diff-ms",232894864),abs_diff,new cljs.core.Keyword(null,"diff-formatted","diff-formatted",-1390625225),musikwichtel.shared.format_time_ms(abs_diff),new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144),(capped * -45.0)], null);

}
}
});

//# sourceMappingURL=musikwichtel.shared.js.map
