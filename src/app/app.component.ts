import {Component} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {TodoComponent} from './pages/todo-componenet/todo/todo-template/todo.component';
import {DialogComponents} from './pages/todo-componenet/todo/todo-dialog/dialog.component';
import {CardComponent} from './pages/card-component/card/card.component';
@Component({
  selector: 'app-root',
  imports: [TableModule, TodoComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
