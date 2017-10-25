import { TestBed, inject } from '@angular/core/testing';

import { IntegrationChangeService } from './integration-change.service';

describe('IntegrationChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegrationChangeService]
    });
  });

  it('should ...', inject([IntegrationChangeService], (service: IntegrationChangeService) => {
    expect(service).toBeTruthy();
  }));
});
