import { TestBed, inject } from '@angular/core/testing';

import { ForFistributonService } from './for-fistributon.service';

describe('ForFistributonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForFistributonService]
    });
  });

  it('should ...', inject([ForFistributonService], (service: ForFistributonService) => {
    expect(service).toBeTruthy();
  }));
});
