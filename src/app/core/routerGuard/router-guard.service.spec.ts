import { TestBed, inject } from '@angular/core/testing';

import { RouterGuardService } from './router-guard.service';

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterGuardService]
    });
  });

  it('should ...', inject([RouterGuardService], (service: RouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
