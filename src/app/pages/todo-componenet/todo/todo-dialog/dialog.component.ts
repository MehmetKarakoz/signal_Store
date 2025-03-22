import {Component, effect, inject, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {TodosStore} from '../../services/todo.store';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-todo-dialog',
  imports: [
    Dialog,
    TableModule,
    Button,
    ReactiveFormsModule,
    InputText
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponents {
  todosStore = inject(TodosStore)
  _visible = signal(false);
_updateDialog=signal(false)
  constructor() {
    effect(() => {
      this._visible.set(this.todosStore.isDialogOpen());
      this._updateDialog.set(this.todosStore.isUpdateDialog())
    });
  }
}
