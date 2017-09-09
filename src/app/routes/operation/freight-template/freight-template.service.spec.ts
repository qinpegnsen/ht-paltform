import { TestBed, inject } from '@angular/core/testing';

import { FreightTemplateService } from './freight-template.service';

describe('FreightTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreightTemplateService]
    });
  });

  it('should ...', inject([FreightTemplateService], (service: FreightTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
