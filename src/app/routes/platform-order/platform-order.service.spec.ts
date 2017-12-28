import { TestBed, inject } from '@angular/core/testing';

import { PlatformOrderService } from './platform-order.service';

describe('PlatformOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatformOrderService]
    });
  });

  it('should be created', inject([PlatformOrderService], (service: PlatformOrderService) => {
    expect(service).toBeTruthy();
  }));
});
