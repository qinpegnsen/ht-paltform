import { TestBed, inject } from '@angular/core/testing';

import { TableDateService } from './table-date.service';

describe('TableDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableDateService]
    });
  });

  it('should ...', inject([TableDateService], (service: TableDateService) => {
    expect(service).toBeTruthy();
  }));
});
