import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRecordComponent } from './cash-record.component';

describe('CashRecordComponent', () => {
  let component: CashRecordComponent;
  let fixture: ComponentFixture<CashRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
