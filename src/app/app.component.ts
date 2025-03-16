import {Component, inject} from '@angular/core';
import {TodosStore} from './store/app.store'
import {JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
@Component({
  selector: 'app-root',
  imports: [JsonPipe, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Signal_Store';
  todosStore = inject(TodosStore)

  ngOnInit(): void {
    this.todosStore.getTodosObservable();
  }
}
