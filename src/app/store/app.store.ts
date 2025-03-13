import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoStore } from '../app.types/app.types';
import { computed, inject } from '@angular/core';
import { ApiBaglantiService } from '../Api-Services/api-baglanti.service';
import { lastValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: TodoStore = {
  todos: [],
  selectedTodo: null,
  isLoading: false,
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    todosCount: computed(() => store.todos().length),
  })),
  withMethods((store) => {
    const apiService = inject(ApiBaglantiService);
    return {
      async getTodosPromise(): Promise<void> {
        patchState(store, { isLoading: true });
        const data = await lastValueFrom(apiService.fetcData());
        patchState(store, { todos: data, isLoading: false });
      },
      getTodosObservable: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            apiService.fetcData().pipe(
              tapResponse({
                next: (data) =>
                  patchState(store, { todos: data, isLoading: false }),
                error: (error) => console.error(error),
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('TodosStore initialized!');
      watchState(store, (state) => {
        console.log(state);
      });
    },
  })
);
