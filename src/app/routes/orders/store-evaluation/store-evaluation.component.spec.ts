import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEvaluationComponent } from './store-evaluation.component';

describe('StoreEvaluationComponent', () => {
  let component: StoreEvaluationComponent;
  let fixture: ComponentFixture<StoreEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
