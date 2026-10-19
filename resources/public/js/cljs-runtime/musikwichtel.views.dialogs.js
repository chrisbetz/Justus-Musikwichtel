goog.provide('musikwichtel.views.dialogs');
musikwichtel.views.dialogs.reset_confirmation_modal = (function musikwichtel$views$dialogs$reset_confirmation_modal(){
var open_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.subs","show-reset-modal?","musikwichtel.subs/show-reset-modal?",500265214)], null)));
if(cljs.core.truth_(open_QMARK_)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-backdrop","div.modal-backdrop",-1603920212),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","cancel-reset","musikwichtel.events/cancel-reset",1521559430)], null));
})], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-card","div.modal-card",1294207224),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
return e.stopPropagation();
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-icon","div.modal-icon",966285335),"\uD83C\uDF84"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.modal-title","h2.modal-title",259444527),"Uhren zur\u00FCcksetzen?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.modal-text","p.modal-text",559636730),"M\u00F6chtest du beide Stoppuhren wirklich auf null stellen?\n(Die Spielernamen bleiben erhalten.)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-actions","div.modal-actions",-1876505373),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.modal-btn.modal-btn--cancel","button.modal-btn.modal-btn--cancel",-301953394),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","cancel-reset","musikwichtel.events/cancel-reset",1521559430)], null));
})], null),"Abbrechen"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.modal-btn.modal-btn--confirm","button.modal-btn.modal-btn--confirm",-702656086),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("musikwichtel.events","confirm-reset","musikwichtel.events/confirm-reset",1927624633)], null));
})], null),"Zur\u00FCcksetzen"], null)], null)], null)], null);
} else {
return null;
}
});

//# sourceMappingURL=musikwichtel.views.dialogs.js.map
