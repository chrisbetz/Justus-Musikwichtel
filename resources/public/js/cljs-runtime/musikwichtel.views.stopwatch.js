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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.player-name-wrapper","div.player-name-wrapper",1397359426),(cljs.core.truth_(cljs.core.deref(editing_QMARK_))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.player-name-input","input.player-name-input",122353739),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"auto-focus","auto-focus",1250006231),true,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(temp_name),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__28841_SHARP_){
return cljs.core.reset_BANG_(temp_name,p1__28841_SHARP_.target.value);
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
})], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.player-name-input","span.player-name-input",658544649),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(temp_name,current_name);

return cljs.core.reset_BANG_(editing_QMARK_,true);
}),new cljs.core.Keyword(null,"title","title",636505583),"Tippen zum \u00C4ndern"], null),current_name], null))], null);
});
});
musikwichtel.views.stopwatch.stopwatch_card = (function musikwichtel$views$stopwatch$stopwatch_card(player_key,default_name,theme_class){
var running_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","is-running?","musikwichtel.subs/is-running?",-1079466802),player_key], null)));
var time_str = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","formatted-time","musikwichtel.subs/formatted-time",1999289514),player_key], null)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stopwatch-card","div.stopwatch-card",-884036183),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(theme_class),(cljs.core.truth_(running_QMARK_)?" running":null)].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.stopwatch.player_name_input,player_key,default_name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.time-display-box","div.time-display-box",-1308945265),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time-digits","span.time-digits",-2139808112),time_str], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls-row","div.controls-row",-1191947279),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.touch-btn.btn-start","button.touch-btn.btn-start",-1865319251),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),running_QMARK_,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","start-timer","musikwichtel.events/start-timer",-1872988888),player_key], null));
}),new cljs.core.Keyword(null,"aria-label","aria-label",455891514),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(default_name)," Start"].join('')], null),"\u25B6 Start"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.touch-btn.btn-stop","button.touch-btn.btn-stop",-41561285),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.not(running_QMARK_),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","stop-timer","musikwichtel.events/stop-timer",-1366705560),player_key], null));
}),new cljs.core.Keyword(null,"aria-label","aria-label",455891514),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(default_name)," Stopp"].join('')], null),"\u23F8 Stopp"], null)], null)], null);
});

//# sourceMappingURL=musikwichtel.views.stopwatch.js.map
