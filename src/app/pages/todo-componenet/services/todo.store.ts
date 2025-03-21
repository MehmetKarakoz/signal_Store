import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {Todo, TodoStatus, TodoStore} from '../../../../shared/Model/app.types';
import { computed, inject } from '@angular/core';
import { ConnectionService } from '../../../Services/connection.service';
import { map, pipe, switchMap, tap} from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: TodoStore = {
  todos: [],
  selectedTodo: null ,
  isLoading: false,
  isDialogOpen:false,
  isUpdateDialog:false
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
    const apiService = inject(ConnectionService);
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
      toggleDialog(todo?:Todo){
        patchState(store, {
          isDialogOpen: !store.isDialogOpen(),
          selectedTodo: store.isDialogOpen() ? null : todo || null
        });
      },
      closeDialog(){
        patchState(store,{
          isDialogOpen:false,
          selectedTodo:store.selectedTodo(),
          isUpdateDialog:false,
        })
      },
      updateDialog(todo?:Todo){
        patchState(store, {
          isUpdateDialog: !store.isUpdateDialog(),
        });
      },
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
