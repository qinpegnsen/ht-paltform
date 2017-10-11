import { TestBed, inject } from '@angular/core/testing';

import { BankTransferService } from './bank-transfer.service';

describe('BankTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankTransferService]
    });
  });

  it('should ...', inject([BankTransferService], (service: BankTransferService) => {
    expect(service).toBeTruthy();
  }));
});
