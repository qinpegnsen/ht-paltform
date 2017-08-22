import { TestBed, inject } from '@angular/core/testing';

import { AreasService } from './areas.service';

describe('AreasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreasService]
    });
  });

  it('should ...', inject([AreasService], (service: AreasService) => {
    expect(service).toBeTruthy();
  }));
});
