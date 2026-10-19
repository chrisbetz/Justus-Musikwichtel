goog.provide('musikwichtel.views.gauge');
musikwichtel.views.gauge.naughty_nice_gauge = (function musikwichtel$views$gauge$naughty_nice_gauge(){
var leader_data = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","leader-info","musikwichtel.subs/leader-info",-1783931939)], null)));
var p1_data = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),new cljs.core.Keyword(null,"player1","player1",-1491573636)], null)));
var p2_data = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),new cljs.core.Keyword(null,"player2","player2",-226422775)], null)));
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
var angle = new cljs.core.Keyword(null,"angle-deg","angle-deg",-1495593144).cljs$core$IFn$_invoke$arity$2(leader_data,(0));
var leader = new cljs.core.Keyword(null,"leader","leader",1888892947).cljs$core$IFn$_invoke$arity$2(leader_data,new cljs.core.Keyword(null,"tie","tie",-487201694));
var status_label = (function (){var G__28825 = leader;
var G__28825__$1 = (((G__28825 instanceof cljs.core.Keyword))?G__28825.fqn:null);
switch (G__28825__$1) {
case "player1":
return ["\u2B50 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1_name)," ist vorn!"].join('');

break;
case "player2":
return ["\u2B50 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p2_name)," ist vorn!"].join('');

break;
case "tie":
return "\u2696\uFE0F Gleichstand";

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__28825__$1)].join('')));

}
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-wrapper","div.gauge-wrapper",1832631877),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-dial","div.gauge-dial",1151064448),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-dial-background","div.gauge-dial-background",-158766288)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-labels","div.gauge-labels",-1644873276),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.gauge-label--left","span.gauge-label--left",2071506551),p1_name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.gauge-label--right","span.gauge-label--right",-2020195292),p2_name], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-needle","div.gauge-needle",-629060576),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateX(-50%) rotate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(angle),"deg)"].join('')], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-needle-pivot","div.gauge-needle-pivot",-576628186)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.gauge-status-text","div.gauge-status-text",-2105689365),status_label], null)], null);
});

//# sourceMappingURL=musikwichtel.views.gauge.js.map
