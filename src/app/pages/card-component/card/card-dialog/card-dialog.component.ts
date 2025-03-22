import {Component, effect, inject, signal} from '@angular/core';
import {CardStore} from '../../services/card.store';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from '../../../../../shared/Model/card.model';
import {Dialog} from 'primeng/dialog';
import {Calendar} from 'primeng/calendar';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-card-dialog',
  imports: [
    Dialog,
    Calendar,
    Button,
    ReactiveFormsModule,
    InputText
  ],
  templateUrl: './card-dialog.component.html',
  styleUrl: './card-dialog.component.scss'
})
export class CardDialogComponent {
  store = inject(CardStore);
  fb = inject(FormBuilder);
  _visible = signal(false);
  cardForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    date: [new Date(), Validators.required]
  });

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
}
