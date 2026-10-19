goog.provide('re_frame.fx');
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null, re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__28485 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__28486 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__28486);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5823__auto___28583 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5823__auto___28583)){
var new_db_28584 = temp__5823__auto___28583;
var fexpr__28488_28585 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__28488_28585.cljs$core$IFn$_invoke$arity$1 ? fexpr__28488_28585.cljs$core$IFn$_invoke$arity$1(new_db_28584) : fexpr__28488_28585.call(null, new_db_28584));
} else {
}

var seq__28489 = cljs.core.seq(effects_without_db);
var chunk__28490 = null;
var count__28491 = (0);
var i__28492 = (0);
while(true){
if((i__28492 < count__28491)){
var vec__28505 = chunk__28490.cljs$core$IIndexed$_nth$arity$2(null, i__28492);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28505,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28505,(1),null);
var temp__5821__auto___28586 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28586)){
var effect_fn_28587 = temp__5821__auto___28586;
(effect_fn_28587.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28587.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28587.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring.",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"event","event",301435442),effect_key))?["You may be trying to return a coeffect map from an event-fx handler. ","See https://day8.github.io/re-frame/use-cofx-as-fx/"].join(''):null)], 0));
}


var G__28588 = seq__28489;
var G__28589 = chunk__28490;
var G__28590 = count__28491;
var G__28591 = (i__28492 + (1));
seq__28489 = G__28588;
chunk__28490 = G__28589;
count__28491 = G__28590;
i__28492 = G__28591;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28489);
if(temp__5823__auto__){
var seq__28489__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28489__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28489__$1);
var G__28592 = cljs.core.chunk_rest(seq__28489__$1);
var G__28593 = c__5525__auto__;
var G__28594 = cljs.core.count(c__5525__auto__);
var G__28595 = (0);
seq__28489 = G__28592;
chunk__28490 = G__28593;
count__28491 = G__28594;
i__28492 = G__28595;
continue;
} else {
var vec__28510 = cljs.core.first(seq__28489__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28510,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28510,(1),null);
var temp__5821__auto___28596 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28596)){
var effect_fn_28597 = temp__5821__auto___28596;
(effect_fn_28597.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28597.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28597.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring.",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"event","event",301435442),effect_key))?["You may be trying to return a coeffect map from an event-fx handler. ","See https://day8.github.io/re-frame/use-cofx-as-fx/"].join(''):null)], 0));
}


var G__28598 = cljs.core.next(seq__28489__$1);
var G__28599 = null;
var G__28600 = (0);
var G__28601 = (0);
seq__28489 = G__28598;
chunk__28490 = G__28599;
count__28491 = G__28600;
i__28492 = G__28601;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__28068__auto___28602 = re_frame.interop.now();
var duration__28069__auto___28603 = (end__28068__auto___28602 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__28069__auto___28603,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__28068__auto___28602);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__28485);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5823__auto___28604 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5823__auto___28604)){
var new_db_28605 = temp__5823__auto___28604;
var fexpr__28514_28606 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__28514_28606.cljs$core$IFn$_invoke$arity$1 ? fexpr__28514_28606.cljs$core$IFn$_invoke$arity$1(new_db_28605) : fexpr__28514_28606.call(null, new_db_28605));
} else {
}

var seq__28515 = cljs.core.seq(effects_without_db);
var chunk__28516 = null;
var count__28517 = (0);
var i__28518 = (0);
while(true){
if((i__28518 < count__28517)){
var vec__28529 = chunk__28516.cljs$core$IIndexed$_nth$arity$2(null, i__28518);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28529,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28529,(1),null);
var temp__5821__auto___28607 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28607)){
var effect_fn_28608 = temp__5821__auto___28607;
(effect_fn_28608.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28608.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28608.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring.",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"event","event",301435442),effect_key))?["You may be trying to return a coeffect map from an event-fx handler. ","See https://day8.github.io/re-frame/use-cofx-as-fx/"].join(''):null)], 0));
}


var G__28609 = seq__28515;
var G__28610 = chunk__28516;
var G__28611 = count__28517;
var G__28612 = (i__28518 + (1));
seq__28515 = G__28609;
chunk__28516 = G__28610;
count__28517 = G__28611;
i__28518 = G__28612;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28515);
if(temp__5823__auto__){
var seq__28515__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28515__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28515__$1);
var G__28613 = cljs.core.chunk_rest(seq__28515__$1);
var G__28614 = c__5525__auto__;
var G__28615 = cljs.core.count(c__5525__auto__);
var G__28616 = (0);
seq__28515 = G__28613;
chunk__28516 = G__28614;
count__28517 = G__28615;
i__28518 = G__28616;
continue;
} else {
var vec__28532 = cljs.core.first(seq__28515__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28532,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28532,(1),null);
var temp__5821__auto___28617 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28617)){
var effect_fn_28618 = temp__5821__auto___28617;
(effect_fn_28618.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28618.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28618.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring.",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"event","event",301435442),effect_key))?["You may be trying to return a coeffect map from an event-fx handler. ","See https://day8.github.io/re-frame/use-cofx-as-fx/"].join(''):null)], 0));
}


var G__28619 = cljs.core.next(seq__28515__$1);
var G__28620 = null;
var G__28621 = (0);
var G__28622 = (0);
seq__28515 = G__28619;
chunk__28516 = G__28620;
count__28517 = G__28621;
i__28518 = G__28622;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__28547){
var map__28548 = p__28547;
var map__28548__$1 = cljs.core.__destructure_map(map__28548);
var effect = map__28548__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28548__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28548__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_((function (){
return re_frame.router.dispatch(dispatch);
}),ms);
}
});
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__28553 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__28554 = null;
var count__28555 = (0);
var i__28556 = (0);
while(true){
if((i__28556 < count__28555)){
var effect = chunk__28554.cljs$core$IIndexed$_nth$arity$2(null, i__28556);
re_frame.fx.dispatch_later(effect);


var G__28623 = seq__28553;
var G__28624 = chunk__28554;
var G__28625 = count__28555;
var G__28626 = (i__28556 + (1));
seq__28553 = G__28623;
chunk__28554 = G__28624;
count__28555 = G__28625;
i__28556 = G__28626;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28553);
if(temp__5823__auto__){
var seq__28553__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28553__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28553__$1);
var G__28627 = cljs.core.chunk_rest(seq__28553__$1);
var G__28628 = c__5525__auto__;
var G__28629 = cljs.core.count(c__5525__auto__);
var G__28630 = (0);
seq__28553 = G__28627;
chunk__28554 = G__28628;
count__28555 = G__28629;
i__28556 = G__28630;
continue;
} else {
var effect = cljs.core.first(seq__28553__$1);
re_frame.fx.dispatch_later(effect);


var G__28631 = cljs.core.next(seq__28553__$1);
var G__28632 = null;
var G__28633 = (0);
var G__28634 = (0);
seq__28553 = G__28631;
chunk__28554 = G__28632;
count__28555 = G__28633;
i__28556 = G__28634;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__28557 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__28558 = null;
var count__28559 = (0);
var i__28560 = (0);
while(true){
if((i__28560 < count__28559)){
var vec__28567 = chunk__28558.cljs$core$IIndexed$_nth$arity$2(null, i__28560);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28567,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28567,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5821__auto___28635 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28635)){
var effect_fn_28636 = temp__5821__auto___28635;
(effect_fn_28636.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28636.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28636.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__28637 = seq__28557;
var G__28638 = chunk__28558;
var G__28639 = count__28559;
var G__28640 = (i__28560 + (1));
seq__28557 = G__28637;
chunk__28558 = G__28638;
count__28559 = G__28639;
i__28560 = G__28640;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28557);
if(temp__5823__auto__){
var seq__28557__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28557__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28557__$1);
var G__28641 = cljs.core.chunk_rest(seq__28557__$1);
var G__28642 = c__5525__auto__;
var G__28643 = cljs.core.count(c__5525__auto__);
var G__28644 = (0);
seq__28557 = G__28641;
chunk__28558 = G__28642;
count__28559 = G__28643;
i__28560 = G__28644;
continue;
} else {
var vec__28570 = cljs.core.first(seq__28557__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28570,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28570,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5821__auto___28645 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5821__auto___28645)){
var effect_fn_28646 = temp__5821__auto___28645;
(effect_fn_28646.cljs$core$IFn$_invoke$arity$1 ? effect_fn_28646.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_28646.call(null, effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__28647 = cljs.core.next(seq__28557__$1);
var G__28648 = null;
var G__28649 = (0);
var G__28650 = (0);
seq__28557 = G__28647;
chunk__28558 = G__28648;
count__28559 = G__28649;
i__28560 = G__28650;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__28573 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__28574 = null;
var count__28575 = (0);
var i__28576 = (0);
while(true){
if((i__28576 < count__28575)){
var event = chunk__28574.cljs$core$IIndexed$_nth$arity$2(null, i__28576);
re_frame.router.dispatch(event);


var G__28651 = seq__28573;
var G__28652 = chunk__28574;
var G__28653 = count__28575;
var G__28654 = (i__28576 + (1));
seq__28573 = G__28651;
chunk__28574 = G__28652;
count__28575 = G__28653;
i__28576 = G__28654;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28573);
if(temp__5823__auto__){
var seq__28573__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28573__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28573__$1);
var G__28655 = cljs.core.chunk_rest(seq__28573__$1);
var G__28656 = c__5525__auto__;
var G__28657 = cljs.core.count(c__5525__auto__);
var G__28658 = (0);
seq__28573 = G__28655;
chunk__28574 = G__28656;
count__28575 = G__28657;
i__28576 = G__28658;
continue;
} else {
var event = cljs.core.first(seq__28573__$1);
re_frame.router.dispatch(event);


var G__28659 = cljs.core.next(seq__28573__$1);
var G__28660 = null;
var G__28661 = (0);
var G__28662 = (0);
seq__28573 = G__28659;
chunk__28574 = G__28660;
count__28575 = G__28661;
i__28576 = G__28662;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__28577 = cljs.core.seq(value);
var chunk__28578 = null;
var count__28579 = (0);
var i__28580 = (0);
while(true){
if((i__28580 < count__28579)){
var event = chunk__28578.cljs$core$IIndexed$_nth$arity$2(null, i__28580);
clear_event(event);


var G__28663 = seq__28577;
var G__28664 = chunk__28578;
var G__28665 = count__28579;
var G__28666 = (i__28580 + (1));
seq__28577 = G__28663;
chunk__28578 = G__28664;
count__28579 = G__28665;
i__28580 = G__28666;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__28577);
if(temp__5823__auto__){
var seq__28577__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__28577__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__28577__$1);
var G__28667 = cljs.core.chunk_rest(seq__28577__$1);
var G__28668 = c__5525__auto__;
var G__28669 = cljs.core.count(c__5525__auto__);
var G__28670 = (0);
seq__28577 = G__28667;
chunk__28578 = G__28668;
count__28579 = G__28669;
i__28580 = G__28670;
continue;
} else {
var event = cljs.core.first(seq__28577__$1);
clear_event(event);


var G__28671 = cljs.core.next(seq__28577__$1);
var G__28672 = null;
var G__28673 = (0);
var G__28674 = (0);
seq__28577 = G__28671;
chunk__28578 = G__28672;
count__28579 = G__28673;
i__28580 = G__28674;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__28581 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__28582 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("reagent","quiescent","reagent/quiescent",-16138681)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__28582);

try{try{return null;
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__28068__auto___28675 = re_frame.interop.now();
var duration__28069__auto___28676 = (end__28068__auto___28675 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__28069__auto___28676,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__28068__auto___28675);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__28581);
}} else {
return null;
}
}
}));

//# sourceMappingURL=re_frame.fx.js.map
