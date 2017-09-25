import { TestBed, inject } from '@angular/core/testing';

import { AllStockService } from './all-stock.service';

describe('AllStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllStockService]
    });
  });

  it('should ...', inject([AllStockService], (service: AllStockService) => {
    expect(service).toBeTruthy();
  }));
});
