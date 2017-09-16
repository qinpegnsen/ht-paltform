import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDetailsComponent } from './refund-details.component';

describe('RefundDetailsComponent', () => {
  let component: RefundDetailsComponent;
  let fixture: ComponentFixture<RefundDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
