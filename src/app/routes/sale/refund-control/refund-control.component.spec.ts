import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundControlComponent } from './refund-control.component';

describe('RefundControlComponent', () => {
  let component: RefundControlComponent;
  let fixture: ComponentFixture<RefundControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
