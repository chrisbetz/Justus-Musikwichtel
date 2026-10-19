goog.provide('musikwichtel.core');
if((typeof musikwichtel !== 'undefined') && (typeof musikwichtel.core !== 'undefined') && (typeof musikwichtel.core.root_atom !== 'undefined')){
} else {
musikwichtel.core.root_atom = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof musikwichtel !== 'undefined') && (typeof musikwichtel.core !== 'undefined') && (typeof musikwichtel.core.raf_id_atom !== 'undefined')){
} else {
musikwichtel.core.raf_id_atom = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof musikwichtel !== 'undefined') && (typeof musikwichtel.core !== 'undefined') && (typeof musikwichtel.core.poll_id_atom !== 'undefined')){
} else {
musikwichtel.core.poll_id_atom = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
musikwichtel.core.tick_loop = (function musikwichtel$core$tick_loop(){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","tick","musikwichtel.events/tick",-2047110064),Date.now()], null));

return cljs.core.reset_BANG_(musikwichtel.core.raf_id_atom,requestAnimationFrame(musikwichtel.core.tick_loop));
});
musikwichtel.core.render_BANG_ = (function musikwichtel$core$render_BANG_(){
var temp__5823__auto__ = cljs.core.deref(musikwichtel.core.root_atom);
if(cljs.core.truth_(temp__5823__auto__)){
var root = temp__5823__auto__;
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2(root,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [musikwichtel.views.main.main_view], null));
} else {
return null;
}
});
musikwichtel.core.init_BANG_ = (function musikwichtel$core$init_BANG_(){
re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","initialize-db","musikwichtel.events/initialize-db",-705450736)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));

var temp__5823__auto___28842 = document.getElementById("app");
if(cljs.core.truth_(temp__5823__auto___28842)){
var el_28843 = temp__5823__auto___28842;
var root_28844 = reagent.dom.client.create_root(el_28843);
cljs.core.reset_BANG_(musikwichtel.core.root_atom,root_28844);

musikwichtel.core.render_BANG_();
} else {
}

if(cljs.core.truth_(cljs.core.deref(musikwichtel.core.raf_id_atom))){
} else {
musikwichtel.core.tick_loop();
}

if(cljs.core.truth_(cljs.core.deref(musikwichtel.core.poll_id_atom))){
return null;
} else {
return cljs.core.reset_BANG_(musikwichtel.core.poll_id_atom,setInterval((function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","poll-state","musikwichtel.events/poll-state",2113227716)], null));
}),(1500)));
}
});
goog.exportSymbol('musikwichtel.core.init_BANG_', musikwichtel.core.init_BANG_);
musikwichtel.core.after_load_BANG_ = (function musikwichtel$core$after_load_BANG_(){
return musikwichtel.core.render_BANG_();
});
goog.exportSymbol('musikwichtel.core.after_load_BANG_', musikwichtel.core.after_load_BANG_);

//# sourceMappingURL=musikwichtel.core.js.map
