import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRefundComponent } from './store-refund.component';

describe('StoreRefundComponent', () => {
  let component: StoreRefundComponent;
  let fixture: ComponentFixture<StoreRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
