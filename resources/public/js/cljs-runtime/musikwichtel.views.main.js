goog.provide('musikwichtel.views.main');
musikwichtel.views.main.fairy_lights_garland = (function musikwichtel$views$main$fairy_lights_garland(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.fairy-garland","div.fairy-garland",-1254158463),(function (){var iter__5480__auto__ = (function musikwichtel$views$main$fairy_lights_garland_$_iter__39844(s__39845){
return (new cljs.core.LazySeq(null,(function (){
var s__39845__$1 = s__39845;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__39845__$1);
if(temp__5823__auto__){
var s__39845__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39845__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__39845__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__39847 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__39846 = (0);
while(true){
if((i__39846 < size__5479__auto__)){
var i = cljs.core._nth(c__5478__auto__,i__39846);
cljs.core.chunk_append(b__39847,(function (){var color_class = (function (){var G__39848 = cljs.core.mod(i,(4));
switch (G__39848) {
case (0):
return "light--red";

break;
case (1):
return "light--gold";

break;
case (2):
return "light--green";

break;
case (3):
return "light--blue";

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39848)].join('')));

}
})();
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.garland-bulb","div.garland-bulb",-114673394),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),color_class], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["garland-light-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null));
})());

var G__39854 = (i__39846 + (1));
i__39846 = G__39854;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39847),musikwichtel$views$main$fairy_lights_garland_$_iter__39844(cljs.core.chunk_rest(s__39845__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39847),null);
}
} else {
var i = cljs.core.first(s__39845__$2);
return cljs.core.cons((function (){var color_class = (function (){var G__39849 = cljs.core.mod(i,(4));
switch (G__39849) {
case (0):
return "light--red";

break;
case (1):
return "light--gold";

break;
case (2):
return "light--green";

break;
case (3):
return "light--blue";

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39849)].join('')));

}
})();
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.garland-bulb","div.garland-bulb",-114673394),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),color_class], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["garland-light-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null));
})(),musikwichtel$views$main$fairy_lights_garland_$_iter__39844(cljs.core.rest(s__39845__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((18)));
})()], null);
});
musikwichtel.views.main.main_view = (function musikwichtel$views$main$main_view(){
var current_user = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071)], null)));
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
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-container","div.app-container",-164087897),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-stars-bg","div.app-stars-bg",1117104529)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.main.fairy_lights_garland], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"header.app-header","header.app-header",-637446905),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-title-badge","div.app-title-badge",1052525506),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-icon","span.title-icon",-1492604553),"\uD83C\uDF84"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.title-text-group","div.title-text-group",730210637),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-main","span.title-main",-234671206),"Wichtel-Wetteifern"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-sub","span.title-sub",273897449),"Weihnachtliches Musik-Duell"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.header-actions","div.header-actions",1368680450),(cljs.core.truth_(current_user)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill-container","div.user-pill-container",1176772851),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill","div.user-pill",-893128688),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(function (){var G__39850 = current_user;
var G__39850__$1 = (((G__39850 instanceof cljs.core.Keyword))?G__39850.fqn:null);
switch (G__39850__$1) {
case "player1":
return "user-pill--p1";

break;
case "player2":
return "user-pill--p2";

break;
default:
return "user-pill--both";

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-icon","span.pill-icon",-820459856),(function (){var G__39851 = current_user;
var G__39851__$1 = (((G__39851 instanceof cljs.core.Keyword))?G__39851.fqn:null);
switch (G__39851__$1) {
case "player1":
return "\uD83C\uDF32";

break;
case "player2":
return "\uD83C\uDFB9";

break;
default:
return "\uD83E\uDDD1\u200D\uD83C\uDF84";

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-name","span.pill-name",504969965),(function (){var G__39852 = current_user;
var G__39852__$1 = (((G__39852 instanceof cljs.core.Keyword))?G__39852.fqn:null);
switch (G__39852__$1) {
case "player1":
return p1_name;

break;
case "player2":
return p2_name;

break;
default:
return "Beide aktiv";

}
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.pill-switch-btn","button.pill-switch-btn",-1598758964),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Spieler wechseln"], null),"Wechseln \u21C4"], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn-header-login","button.btn-header-login",224284861),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
})], null),"\uD83C\uDF85 Anmelden"], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.reset-icon-btn","button.reset-icon-btn",952231351),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-reset-modal","musikwichtel.events/open-reset-modal",40575820)], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Stoppuhren zur\u00FCcksetzen",new cljs.core.Keyword(null,"aria-label","aria-label",455891514),"Stoppuhren zur\u00FCcksetzen"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\u27F3"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main.arena-row","main.arena-row",-1365789394),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.stopwatch_card,new cljs.core.Keyword(null,"player1","player1",-1491573636),"Oboe","stopwatch-card--p1"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.gauge.naughty_nice_gauge], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.stopwatch_card,new cljs.core.Keyword(null,"player2","player2",-226422775),"Klavier","stopwatch-card--p2"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.village.living_christmas_village], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.dialogs.reset_confirmation_modal], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.dialogs.player_login_modal], null)], null);
});

//# sourceMappingURL=musikwichtel.views.main.js.map
