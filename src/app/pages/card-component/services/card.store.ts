
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {Card} from '../../../../shared/Model/card.model';

export interface CardState {
  cards: Card[];
  showDialog: boolean;
}

const initialState: CardState = {
  cards: [],
  showDialog: false
};

export const CardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addItem(card: Card) {
      patchState(store, (state) => ({
        cards: [...state.cards, card]
      }));
      this.toggleDialog();
    },
    toggleDialog() {
      patchState(store, (state) => ({
        showDialog: !state.showDialog
      }));
    }
  })),
  withComputed((store) => ({
    cardsCount: computed(() => store.cards().length)
  }))
);
