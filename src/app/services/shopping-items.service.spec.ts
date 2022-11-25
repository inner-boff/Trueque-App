/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShoppingItemsService } from './shopping-items.service';

describe('Service: ShoppingItems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingItemsService]
    });
  });

  it('should ...', inject([ShoppingItemsService], (service: ShoppingItemsService) => {
    expect(service).toBeTruthy();
  }));
});
