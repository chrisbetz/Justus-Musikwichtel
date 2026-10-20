goog.provide('musikwichtel.views.stopwatch');
musikwichtel.views.stopwatch.player_name_input = (function musikwichtel$views$stopwatch$player_name_input(player_key,default_name){
var editing_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var temp_name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
return (function (player_key__$1,default_name__$1){
var p_data = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","player","musikwichtel.subs/player",544465150),player_key__$1], null)));
var current_name = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p_data);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default_name__$1;
}
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.player-name-wrapper","div.player-name-wrapper",1397359426),(cljs.core.truth_(cljs.core.deref(editing_QMARK_))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.player-name-input","input.player-name-input",122353739),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"auto-focus","auto-focus",1250006231),true,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(temp_name),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__39843_SHARP_){
return cljs.core.reset_BANG_(temp_name,p1__39843_SHARP_.target.value);
}),new cljs.core.Keyword(null,"on-blur","on-blur",814300747),(function (){
if(cljs.core.seq(cljs.core.deref(temp_name).trim())){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","update-name","musikwichtel.events/update-name",904505840),player_key__$1,cljs.core.deref(temp_name)], null));
} else {
}

return cljs.core.reset_BANG_(editing_QMARK_,false);
}),new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765),(function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.key,"Enter")){
if(cljs.core.seq(cljs.core.deref(temp_name).trim())){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","update-name","musikwichtel.events/update-name",904505840),player_key__$1,cljs.core.deref(temp_name)], null));
} else {
}

cljs.core.reset_BANG_(editing_QMARK_,false);
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.key,"Escape")){
return cljs.core.reset_BANG_(editing_QMARK_,false);
} else {
return null;
}
})], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.player-title-row","div.player-title-row",-1545930430),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.player-name-text","span.player-name-text",33667674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(temp_name,current_name);

return cljs.core.reset_BANG_(editing_QMARK_,true);
}),new cljs.core.Keyword(null,"title","title",636505583),"Tippen zum \u00C4ndern des Namens"], null),current_name], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.edit-hint-pencil","span.edit-hint-pencil",2131908842),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Name bearbeiten"], null),"\u270F\uFE0F"], null)], null))], null);
});
});
musikwichtel.views.stopwatch.stopwatch_card = (function musikwichtel$views$stopwatch$stopwatch_card(player_key,default_name,theme_class){
var running_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","is-running?","musikwichtel.subs/is-running?",-1079466802),player_key], null)));
var time_str = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","formatted-time","musikwichtel.subs/formatted-time",1999289514),player_key], null)));
var current_user = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","current-player","musikwichtel.subs/current-player",-1378106071)], null)));
var can_control_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","can-control?","musikwichtel.subs/can-control?",985880950),player_key], null)));
var is_mine_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_user,new cljs.core.Keyword(null,"both","both",-393648840))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_user,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(player_key))));
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stopwatch-card","div.stopwatch-card",-884036183),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(theme_class),(cljs.core.truth_(running_QMARK_)?" running":null),((is_mine_QMARK_)?" card--mine":null),(cljs.core.truth_((function (){var and__5000__auto__ = current_user;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(can_control_QMARK_);
} else {
return and__5000__auto__;
}
})())?" card--other-player":null)].join('')], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.card-snow-cap","div.card-snow-cap",-1813294645)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.card-holly-decor","div.card-holly-decor",1728632818),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player_key,new cljs.core.Keyword(null,"player1","player1",-1491573636)))?"\uD83C\uDF32":"\uD83C\uDFB9")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.player-status-badge-row","div.player-status-badge-row",-1711347271),((is_mine_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.player-badge.badge--mine","span.player-badge.badge--mine",-506656683),"\u2728 Dein Instrument"], null):(((current_user == null))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.player-badge.badge--login-prompt","button.player-badge.badge--login-prompt",1388450548),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","login","musikwichtel.events/login",1257900447),player_key], null));
})], null),"\uD83D\uDD12 Anmelden"], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.player-badge.badge--switch-prompt","button.player-badge.badge--switch-prompt",820906646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
})], null),"Wechseln \u21C4"], null)
))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.player_name_input,player_key,default_name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.time-display-box","div.time-display-box",-1308945265),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time-digits","span.time-digits",-2139808112),time_str], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls-row","div.controls-row",-1191947279),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.touch-btn.btn-start","button.touch-btn.btn-start",-1865319251),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),running_QMARK_,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
if(((is_mine_QMARK_) || ((current_user == null)))){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","start-timer","musikwichtel.events/start-timer",-1872988888),player_key], null));
} else {
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
}
}),new cljs.core.Keyword(null,"aria-label","aria-label",455891514),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(default_name)," Start"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.btn-icon","span.btn-icon",-1336919704),"\u25B6"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\u00DCben"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.touch-btn.btn-stop","button.touch-btn.btn-stop",-41561285),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.not(running_QMARK_),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
if(((is_mine_QMARK_) || ((current_user == null)))){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","stop-timer","musikwichtel.events/stop-timer",-1366705560),player_key], null));
} else {
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","open-login-modal","musikwichtel.events/open-login-modal",1091143897)], null));
}
}),new cljs.core.Keyword(null,"aria-label","aria-label",455891514),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(default_name)," Stopp"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.btn-icon","span.btn-icon",-1336919704),"\u23F8"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Pause"], null)], null)], null)], null);
});

//# sourceMappingURL=musikwichtel.views.stopwatch.js.map
