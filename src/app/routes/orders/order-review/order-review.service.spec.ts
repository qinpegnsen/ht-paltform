import { TestBed, inject } from '@angular/core/testing';

import { OrderReviewService } from './order-review.service';

describe('OrderReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderReviewService]
    });
  });

  it('should ...', inject([OrderReviewService], (service: OrderReviewService) => {
    expect(service).toBeTruthy();
  }));
});
