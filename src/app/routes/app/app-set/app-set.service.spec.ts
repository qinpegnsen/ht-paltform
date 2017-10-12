import { TestBed, inject } from '@angular/core/testing';

import { AppSetService } from './app-set.service';

describe('AppSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSetService]
    });
  });

  it('should ...', inject([AppSetService], (service: AppSetService) => {
    expect(service).toBeTruthy();
  }));
});
