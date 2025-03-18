import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {Todo, TodoStatus, TodoStore} from '../type-model/app.types';
import { computed, inject } from '@angular/core';
import { ApiBaglantiService } from '../Api-Services/api-baglanti.service';
import {lastValueFrom, map, pipe, switchMap, tap} from 'rxjs';
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
    todosByStatus: computed(() => {
      return {
        [TodoStatus.TODO]: store.todos().filter(todo => todo.status === TodoStatus.TODO),
        [TodoStatus.IN_PROGRESS]: store.todos().filter(todo => todo.status === TodoStatus.IN_PROGRESS),
        [TodoStatus.DONE]: store.todos().filter(todo => todo.status === TodoStatus.DONE)
      } as Record<TodoStatus, Todo[]>;
    }),
  })),
  withMethods((store) => {
    const apiService = inject(ApiBaglantiService);
    return {
      getTodosObservable: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            apiService.fetchData().pipe(
              map((data) => {
                return data.slice(0, 10).map((todo, index) => {
                  let status: TodoStatus;
                  if (index < 3) {
                    status = TodoStatus.TODO;
                  } else if (index < 6) {
                    status = TodoStatus.IN_PROGRESS;
                  } else {
                    status = TodoStatus.DONE;
                  }
                  return { ...todo, status };
                });
              }),

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
      watchState(store, (state) => {
        if(state.todos.length!==0){
          console.log(state.todos);
        }
      });
    },
  })
);

/*
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log("Gelen Veri" , data)
  });
*/
