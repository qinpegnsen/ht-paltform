import { TestBed, inject } from '@angular/core/testing';

import { RzhtoolsService } from './rzhtools.service';

describe('RzhtoolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RzhtoolsService]
    });
  });

  it('should ...', inject([RzhtoolsService], (service: RzhtoolsService) => {
    expect(service).toBeTruthy();
  }));
});
