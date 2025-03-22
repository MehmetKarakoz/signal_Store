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
  fb = inject(FormBuilder);
  _visible = signal(false);

  cardForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    date: [new Date(), Validators.required]
  });
  sessionStorages=signal<Card[]>([])
  ngOnInit() {
    const storedData = sessionStorage.getItem('cards');

    if (storedData) {
      this.sessionStorages.set(JSON.parse(storedData))
    } else {
      this.sessionStorages.set([])
    }

    console.log(this.sessionStorages());
  }
  constructor() {
    effect(() => {
      this._visible.set(this.store.showDialog());

    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.store.addItem(this.cardForm.value as Card);
      this.cardForm.reset({
        name: '',
        date: new Date()
      });
    }
  }

  protected readonly sessionStorage = sessionStorage;
}
