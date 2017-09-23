import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAmountComponent } from './order-amount.component';

describe('OrderAmountComponent', () => {
  let component: OrderAmountComponent;
  let fixture: ComponentFixture<OrderAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
