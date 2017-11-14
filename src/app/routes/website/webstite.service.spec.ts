import { TestBed, inject } from '@angular/core/testing';

import { WebstiteService } from './webstite.service';

describe('WebstiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebstiteService]
    });
  });

  it('should be created', inject([WebstiteService], (service: WebstiteService) => {
    expect(service).toBeTruthy();
  }));
});
