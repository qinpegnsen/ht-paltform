import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForEvalComponent } from './wait-for-eval.component';

describe('WaitForEvalComponent', () => {
  let component: WaitForEvalComponent;
  let fixture: ComponentFixture<WaitForEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
