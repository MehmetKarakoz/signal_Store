import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {TodoHeader, TodoStatus} from '../../../../../shared/Model/app.types';
import {TodosStore} from '../../services/todo.store';
import {DialogComponents} from '../todo-dialog/dialog.component';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-todo',
  imports: [TableModule, Button, DialogComponents, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit
{
  todosStore = inject(TodosStore)
  _visible = signal(false);

  ngOnInit(){
    this.todosStore.getTodosObservable()
  }
  constructor() {
    effect(() => {
      this._visible.set(this.todosStore.isDialogOpen());
    });
  }

  protected readonly TodoStatus = TodoStatus;
  protected readonly TodoHeader = TodoHeader;
  protected readonly Object = Object;
}
