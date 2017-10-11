import { TestBed, inject } from '@angular/core/testing';

import { ReasonRejecService } from './reason-rejec.service';

describe('ReasonRejecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReasonRejecService]
    });
  });

  it('should ...', inject([ReasonRejecService], (service: ReasonRejecService) => {
    expect(service).toBeTruthy();
  }));
});
