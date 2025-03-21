import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Item {
  name: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService  {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor() {}

  addItem(item: Item) {
    const currentItems = this.itemsSubject.getValue();
    this.itemsSubject.next([...currentItems, item]);
  }
}
