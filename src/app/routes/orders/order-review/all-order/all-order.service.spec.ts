import { TestBed, inject } from '@angular/core/testing';

import { AllOrderService } from './all-order.service';

describe('AllOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllOrderService]
    });
  });

  it('should ...', inject([AllOrderService], (service: AllOrderService) => {
    expect(service).toBeTruthy();
  }));
});
