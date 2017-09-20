import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingDeliveryComponent } from './awaiting-delivery.component';

describe('AwaitingDeliveryComponent', () => {
  let component: AwaitingDeliveryComponent;
  let fixture: ComponentFixture<AwaitingDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitingDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
