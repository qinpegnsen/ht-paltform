import { TestBed, inject } from '@angular/core/testing';

import { StoreOrderService } from './store-order.service';

describe('StoreOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreOrderService]
    });
  });

  it('should be created', inject([StoreOrderService], (service: StoreOrderService) => {
    expect(service).toBeTruthy();
  }));
});
