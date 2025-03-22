import {Component} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {CardComponent} from './pages/card-component/card/card-template/card.component';
@Component({
  selector: 'app-root',
  imports: [TableModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
