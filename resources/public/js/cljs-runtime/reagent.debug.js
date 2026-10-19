goog.provide('reagent.debug');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__21621__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__21621 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__21622__i = 0, G__21622__a = new Array(arguments.length -  0);
while (G__21622__i < G__21622__a.length) {G__21622__a[G__21622__i] = arguments[G__21622__i + 0]; ++G__21622__i;}
  args = new cljs.core.IndexedSeq(G__21622__a,0,null);
} 
return G__21621__delegate.call(this,args);};
G__21621.cljs$lang$maxFixedArity = 0;
G__21621.cljs$lang$applyTo = (function (arglist__21623){
var args = cljs.core.seq(arglist__21623);
return G__21621__delegate(args);
});
G__21621.cljs$core$IFn$_invoke$arity$variadic = G__21621__delegate;
return G__21621;
})()
);

(o.error = (function() { 
var G__21624__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__21624 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__21627__i = 0, G__21627__a = new Array(arguments.length -  0);
while (G__21627__i < G__21627__a.length) {G__21627__a[G__21627__i] = arguments[G__21627__i + 0]; ++G__21627__i;}
  args = new cljs.core.IndexedSeq(G__21627__a,0,null);
} 
return G__21624__delegate.call(this,args);};
G__21624.cljs$lang$maxFixedArity = 0;
G__21624.cljs$lang$applyTo = (function (arglist__21632){
var args = cljs.core.seq(arglist__21632);
return G__21624__delegate(args);
});
G__21624.cljs$core$IFn$_invoke$arity$variadic = G__21624__delegate;
return G__21624;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null, ));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=reagent.debug.js.map
