import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemsService {

  private _items: string[];
  private _isEmpty: boolean;

  constructor() { 
    this._items = [];
    this._isEmpty = true;
  }
  
  public get isEmpty(): boolean {
    return this._isEmpty;
  }
  public set isEmpty(value: boolean) {
    this._isEmpty = value;
  }
  
  public get items(): string[] {
    return this._items;
  }
  public set items(value: string[]) {
    this._items = value;
  }
  
  addItem(item: string){
    this._items.push(item);
    this._isEmpty = false;
  }

  removeItem(item: string){
    let index = this._items.findIndex( it => it === item);
    this._items.splice(index, 1);

    if(this._items.length === 0){
      this._isEmpty = true;
    }
  }

  removeAllItems(){
    this._items = [];
    this._isEmpty = true;
  }

  exitsItem(item: string){
    const itemFound = this._items.find( it => it.toLowerCase().trim() === item.toLowerCase().trim())
    
    if (itemFound){
      return true;
    }else{
      return false;
    }
    
  }
}
