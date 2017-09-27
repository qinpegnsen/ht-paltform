import { TestBed, inject } from '@angular/core/testing';

import { AppIndexOptService } from './app-index-opt.service';

describe('AppIndexOptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppIndexOptService]
    });
  });

  it('should ...', inject([AppIndexOptService], (service: AppIndexOptService) => {
    expect(service).toBeTruthy();
  }));
});
