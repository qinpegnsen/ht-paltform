import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAuditComponent } from './deposit-audit.component';

describe('DepositAuditComponent', () => {
  let component: DepositAuditComponent;
  let fixture: ComponentFixture<DepositAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
