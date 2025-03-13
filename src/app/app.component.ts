import {Component, inject} from '@angular/core';
import {TodosStore} from './store/app.store'
import {JsonPipe} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Signal_Store';
  todosStore = inject(TodosStore)

  ngOnInit(): void {
    this.todosStore.getTodosObservable();
    console.log("sdasdsa")
  }
}
