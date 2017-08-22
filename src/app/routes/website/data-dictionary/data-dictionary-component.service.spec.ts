import { TestBed, inject } from '@angular/core/testing';

import { DataDictionaryComponentService } from './data-dictionary-component.service';

describe('DataDictionaryComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDictionaryComponentService]
    });
  });

  it('should ...', inject([DataDictionaryComponentService], (service: DataDictionaryComponentService) => {
    expect(service).toBeTruthy();
  }));
});
