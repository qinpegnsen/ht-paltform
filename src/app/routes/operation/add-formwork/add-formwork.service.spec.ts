import { TestBed, inject } from '@angular/core/testing';

import { AddFormworkService } from './add-formwork.service';

describe('AddFormworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddFormworkService]
    });
  });

  it('should ...', inject([AddFormworkService], (service: AddFormworkService) => {
    expect(service).toBeTruthy();
  }));
});
