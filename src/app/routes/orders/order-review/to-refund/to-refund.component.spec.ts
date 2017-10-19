import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToRefundComponent } from './to-refund.component';

describe('ToRefundComponent', () => {
  let component: ToRefundComponent;
  let fixture: ComponentFixture<ToRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
