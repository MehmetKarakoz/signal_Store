import {Component, inject, signal} from '@angular/core';
import {TodosStore} from './store/app.store'
import {JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputText} from 'primeng/inputtext';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
@Component({
  selector: 'app-root',
  imports: [JsonPipe, TableModule, InputText, ToggleSwitch, Button, Checkbox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Signal_Store';
  todosStore = inject(TodosStore)
  openFilter=signal(false);
userId=[1,3,5,7]
  ngOnInit(): void {
    this.todosStore.getTodosObservable();
  }
  filter(){
    this.openFilter.set(!this.openFilter());
  }
}
