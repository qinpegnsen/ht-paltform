import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEvaluationComponent } from './buyer-evaluation.component';

describe('BuyerEvaluationComponent', () => {
  let component: BuyerEvaluationComponent;
  let fixture: ComponentFixture<BuyerEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
