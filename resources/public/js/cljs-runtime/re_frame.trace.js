goog.provide('re_frame.trace');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});
/**
 * @define {boolean}
 */
re_frame.trace.trace_enabled_QMARK_ = goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__28096){
var map__28097 = p__28096;
var map__28097__$1 = cljs.core.__destructure_map(map__28097);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28097__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28097__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28097__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28097__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),re_frame.trace.next_id(),new cljs.core.Keyword(null,"operation","operation",-1267664310),operation,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type,new cljs.core.Keyword(null,"tags","tags",1771418977),tags,new cljs.core.Keyword(null,"child-of","child-of",-903376662),(function (){var or__5002__auto__ = child_of;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",-355208981),re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__28101_28145 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__28102_28146 = null;
var count__28103_28147 = (0);
var i__28104_28148 = (0);
while(true){
if((i__28104_28148 < count__28103_28147)){
var vec__28121_28149 = chunk__28102_28146.cljs$core$IIndexed$_nth$arity$2(null, i__28104_28148);
var k_28150 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28121_28149,(0),null);
var cb_28151 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28121_28149,(1),null);
try{var G__28125_28152 = cljs.core.deref(re_frame.trace.traces);
(cb_28151.cljs$core$IFn$_invoke$arity$1 ? cb_28151.cljs$core$IFn$_invoke$arity$1(G__28125_28152) : cb_28151.call(null, G__28125_28152));
}catch (e28124){var e_28153 = e28124;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_28150,"while storing",cljs.core.deref(re_frame.trace.traces),e_28153], 0));
}

var G__28154 = seq__28101_28145;
var G__28155 = chunk__28102_28146;
var G__28156 = count__28103_28147;
var G__28157 = (i__28104_28148 + (1));
seq__28101_28145 = G__28154;
chunk__28102_28146 = G__28155;
count__28103_28147 = G__28156;
i__28104_28148 = G__28157;
continue;
} else {
var temp__5823__auto___28158 = cljs.core.seq(seq__28101_28145);
if(temp__5823__auto___28158){
var seq__28101_28159__$1 = temp__5823__auto___28158;
if(cljs.core.chunked_seq_QMARK_(seq__28101_28159__$1)){
var c__5525__auto___28160 = cljs.core.chunk_first(seq__28101_28159__$1);
var G__28161 = cljs.core.chunk_rest(seq__28101_28159__$1);
var G__28162 = c__5525__auto___28160;
var G__28163 = cljs.core.count(c__5525__auto___28160);
var G__28164 = (0);
seq__28101_28145 = G__28161;
chunk__28102_28146 = G__28162;
count__28103_28147 = G__28163;
i__28104_28148 = G__28164;
continue;
} else {
var vec__28127_28165 = cljs.core.first(seq__28101_28159__$1);
var k_28166 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28127_28165,(0),null);
var cb_28167 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28127_28165,(1),null);
try{var G__28133_28168 = cljs.core.deref(re_frame.trace.traces);
(cb_28167.cljs$core$IFn$_invoke$arity$1 ? cb_28167.cljs$core$IFn$_invoke$arity$1(G__28133_28168) : cb_28167.call(null, G__28133_28168));
}catch (e28131){var e_28169 = e28131;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_28166,"while storing",cljs.core.deref(re_frame.trace.traces),e_28169], 0));
}

var G__28171 = cljs.core.next(seq__28101_28159__$1);
var G__28172 = null;
var G__28173 = (0);
var G__28174 = (0);
seq__28101_28145 = G__28171;
chunk__28102_28146 = G__28172;
count__28103_28147 = G__28173;
i__28104_28148 = G__28174;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null, ));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});

//# sourceMappingURL=re_frame.trace.js.map
