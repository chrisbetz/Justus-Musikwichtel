goog.provide('musikwichtel.views.main');
musikwichtel.views.main.fairy_lights_garland = (function musikwichtel$views$main$fairy_lights_garland(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.fairy-garland","div.fairy-garland",-1254158463),(function (){var iter__5480__auto__ = (function musikwichtel$views$main$fairy_lights_garland_$_iter__24769(s__24770){
return (new cljs.core.LazySeq(null,(function (){
var s__24770__$1 = s__24770;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__24770__$1);
if(temp__5823__auto__){
var s__24770__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__24770__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__24770__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__24772 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__24771 = (0);
while(true){
if((i__24771 < size__5479__auto__)){
var i = cljs.core._nth(c__5478__auto__,i__24771);
cljs.core.chunk_append(b__24772,(function (){var color_class = (function (){var G__24773 = cljs.core.mod(i,(4));
switch (G__24773) {
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
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__24773)].join('')));

}
})();
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.garland-bulb","div.garland-bulb",-114673394),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),color_class], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["garland-light-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null));
})());

var G__24779 = (i__24771 + (1));
i__24771 = G__24779;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__24772),musikwichtel$views$main$fairy_lights_garland_$_iter__24769(cljs.core.chunk_rest(s__24770__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__24772),null);
}
} else {
var i = cljs.core.first(s__24770__$2);
return cljs.core.cons((function (){var color_class = (function (){var G__24774 = cljs.core.mod(i,(4));
switch (G__24774) {
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
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__24774)].join('')));

}
})();
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.garland-bulb","div.garland-bulb",-114673394),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),color_class], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["garland-light-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null));
})(),musikwichtel$views$main$fairy_lights_garland_$_iter__24769(cljs.core.rest(s__24770__$2)));
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
var garden_user = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","garden-user","musikwichtel.subs/garden-user",581092382)], null)));
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
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-container","div.app-container",-164087897),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-stars-bg","div.app-stars-bg",1117104529)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.main.fairy_lights_garland], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"header.app-header","header.app-header",-637446905),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app-title-badge","div.app-title-badge",1052525506),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-icon","span.title-icon",-1492604553),"\uD83C\uDF84"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.title-text-group","div.title-text-group",730210637),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-main","span.title-main",-234671206),"Wichtel-Wetteifern"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.title-sub","span.title-sub",273897449),"Weihnachtliches Musik-Duell"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.header-actions","div.header-actions",1368680450),(cljs.core.truth_(current_user)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill-container","div.user-pill-container",1176772851),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill","div.user-pill",-893128688),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(function (){var G__24775 = current_user;
var G__24775__$1 = (((G__24775 instanceof cljs.core.Keyword))?G__24775.fqn:null);
switch (G__24775__$1) {
case "player1":
return "user-pill--p1";

break;
case "player2":
return "user-pill--p2";

break;
default:
return "";

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-icon","span.pill-icon",-820459856),(function (){var G__24776 = current_user;
var G__24776__$1 = (((G__24776 instanceof cljs.core.Keyword))?G__24776.fqn:null);
switch (G__24776__$1) {
case "player1":
return "\uD83C\uDF32";

break;
case "player2":
return "\uD83C\uDFB9";

break;
default:
return "\uD83E\uDDD1\u200D\uD83C\uDF84";

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-name","span.pill-name",504969965),(function (){var G__24777 = current_user;
var G__24777__$1 = (((G__24777 instanceof cljs.core.Keyword))?G__24777.fqn:null);
switch (G__24777__$1) {
case "player1":
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1_name)," (@quentin)"].join('');

break;
case "player2":
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p2_name)," (@kilian)"].join('');

break;
default:
return "Aktiv";

}
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.pill-switch-btn","button.pill-switch-btn",-1598758964),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Garden ID Konto / Abmelden"], null),"Konto \uD83D\uDC64"], null)], null):(cljs.core.truth_(garden_user)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill-container","div.user-pill-container",1176772851),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-pill.user-pill--guest","div.user-pill.user-pill--guest",-1888415152),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-icon","span.pill-icon",-820459856),"\uD83D\uDC40"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pill-name","span.pill-name",504969965),["@",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"username","username",1605666410).cljs$core$IFn$_invoke$arity$1(garden_user))," (Zuschauer)"].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.pill-switch-btn","button.pill-switch-btn",-1598758964),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Konto wechseln"], null),"Wechseln \u21C4"], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn-header-login","button.btn-header-login",224284861),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
})], null),"\uD83C\uDF85 Garden ID Login"], null)
)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.reset-icon-btn","button.reset-icon-btn",952231351),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-reset-modal","musikwichtel.events/open-reset-modal",40575820)], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Stoppuhren zur\u00FCcksetzen",new cljs.core.Keyword(null,"aria-label","aria-label",455891514),"Stoppuhren zur\u00FCcksetzen"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\u27F3"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main.arena-row","main.arena-row",-1365789394),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.stopwatch_card,new cljs.core.Keyword(null,"player1","player1",-1491573636),"Oboe","stopwatch-card--p1"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.gauge.naughty_nice_gauge], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.stopwatch_card,new cljs.core.Keyword(null,"player2","player2",-226422775),"Klavier","stopwatch-card--p2"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.village.living_christmas_village], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.dialogs.reset_confirmation_modal], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.dialogs.player_login_modal], null)], null);
});

//# sourceMappingURL=musikwichtel.views.main.js.map
