import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundVerifyComponent } from './refund-verify.component';

describe('RefundVerifyComponent', () => {
  let component: RefundVerifyComponent;
  let fixture: ComponentFixture<RefundVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
