import { TestBed, inject } from '@angular/core/testing';

import { AgentpersonService } from './agentperson.service';

describe('AgentpersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentpersonService]
    });
  });

  it('should ...', inject([AgentpersonService], (service: AgentpersonService) => {
    expect(service).toBeTruthy();
  }));
});
