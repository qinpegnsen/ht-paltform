import { TestBed, inject } from '@angular/core/testing';

import { AdddataService } from './adddata.service';

describe('AdddataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdddataService]
    });
  });

  it('should ...', inject([AdddataService], (service: AdddataService) => {
    expect(service).toBeTruthy();
  }));
});
