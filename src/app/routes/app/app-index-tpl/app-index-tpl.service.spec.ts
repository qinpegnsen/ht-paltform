import { TestBed, inject } from '@angular/core/testing';

import { AppIndexTplService } from './app-index-tpl.service';

describe('AppIndexTplService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppIndexTplService]
    });
  });

  it('should ...', inject([AppIndexTplService], (service: AppIndexTplService) => {
    expect(service).toBeTruthy();
  }));
});
