import { TestBed, inject } from '@angular/core/testing';

import { MeasureService } from './measure.service';

describe('MeasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureService]
    });
  });

  it('should ...', inject([MeasureService], (service: MeasureService) => {
    expect(service).toBeTruthy();
  }));
});
