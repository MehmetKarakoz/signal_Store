import {Component, inject} from '@angular/core';
import {TodosStore} from './store/app.store'
import {JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {TodoHeader, TodoStatus} from './type-model/app.types';
import {IconField} from 'primeng/iconfield';
@Component({
  selector: 'app-root',
  imports: [JsonPipe, TableModule, IconField, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todosStore = inject(TodosStore)
  dialog=this.todosStore.getDialog()


  protected readonly TodoStatus = TodoStatus;
  protected readonly TodoHeader = TodoHeader;
  protected readonly Object = Object;
}
