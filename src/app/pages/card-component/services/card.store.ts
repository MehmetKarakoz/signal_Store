
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {Card} from '../../../../shared/Model/card.model';

export interface CardState {
  cards: Card[];
  showDialog: boolean;
}

const initialState: CardState = {
  cards: JSON.parse(sessionStorage.getItem('cards') ||'[]'),
  /* cards type'nın içeriği sesionStorage içerisindeki key = cards değeri VARSA || yoksa boş array olacağı belirtiliyor*/
  showDialog: false
};

export const CardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addItem(card: Card) {
      const updatedCards = [...store.cards(), card];
      /*yeni kart eklendiğinde updateCards içeriği store.cards kopyalanır ve üzerinde card (yeni oluşturulan kart eklenir ) */
      patchState(store, { cards: updatedCards });
      /* store içerisindeki cards: update güncellenir */
      this.updateSessionStorage(updatedCards);
    },
    removeItem(cardId:string){
      /*cardId adında bir string değer alacağı belirtilir */
      const updatedCards = store.cards().filter(c => c.name !== cardId);
      /* update cards değişkeninin içeriği cards içeriğini filtrele ve cardId ile uyuşan veriyi güncelle */
      patchState(store, {cards:updatedCards});
      this.updateSessionStorage(updatedCards)
    },
    updateSessionStorage(cards:Card[]){
      sessionStorage.setItem('cards',JSON.stringify(cards))
      /*sessionStorage içeriğinde bulunan cards value değerini güncelle */
    },
    initializedFromStorage(){
      const storedCards=JSON.parse(sessionStorage.getItem('cards')||'[]') ;
      patchState(store,{cards:storedCards})
      /* storedCards içerisine tüm cardları alıyoruz ve güncelliyoruz eğer yok ise boş array kullanıyoruz */
    },

    toggleDialog() {
      patchState(store, (state) => ({
        showDialog: !state.showDialog
        /*showDialog değerinin tam tersini alır yaani açık ise kapalı kapalı ise açık */
      }));
    },

    clearCards() {
      patchState(store, { cards: [] });
      sessionStorage.removeItem('cards');
    },

    setCards(cards: Card[]) {
      patchState(store, { cards: cards });

    }
  })),
  withComputed((store) => ({
    cardsCount: computed(() => store.cards().length),
    isEmpty: computed(() => store.cards().length === 0)

  }))
);
