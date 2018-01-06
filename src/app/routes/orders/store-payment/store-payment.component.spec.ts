import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePaymentComponent } from './store-payment.component';

describe('StorePaymentComponent', () => {
  let component: StorePaymentComponent;
  let fixture: ComponentFixture<StorePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
