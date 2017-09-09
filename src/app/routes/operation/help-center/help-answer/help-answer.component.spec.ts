import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAnswerComponent } from './help-answer.component';

describe('HelpAnswerComponent', () => {
  let component: HelpAnswerComponent;
  let fixture: ComponentFixture<HelpAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
