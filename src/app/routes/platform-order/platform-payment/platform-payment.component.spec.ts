import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformPaymentComponent } from './platform-payment.component';

describe('PlatformPaymentComponent', () => {
  let component: PlatformPaymentComponent;
  let fixture: ComponentFixture<PlatformPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
