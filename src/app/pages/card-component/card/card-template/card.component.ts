import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {CardStore} from '../../services/card.store';
import {Card} from '../../../../../shared/Model/card.model';
import {CardDialogComponent} from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-card-template',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    Button,
    CardDialogComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  store = inject(CardStore);
  _visible = signal(false);

  ngOnInit() {
    const storedCards = sessionStorage.getItem('cards');
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);
      this.store.setCards(parsedCards);
    }
  }
  constructor() {
    effect(() => {
      this._visible.set(this.store.showDialog());
    });
  }
  removeCard(cardId:string){
    this.store.removeItem(cardId)
  }
}
