import { TestBed, inject } from '@angular/core/testing';

import { GetUidService } from './get-uid.service';

describe('GetUidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUidService]
    });
  });

  it('should ...', inject([GetUidService], (service: GetUidService) => {
    expect(service).toBeTruthy();
  }));
});
