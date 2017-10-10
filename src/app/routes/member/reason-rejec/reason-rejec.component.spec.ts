import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonRejecComponent } from './reason-rejec.component';

describe('ReasonRejecComponent', () => {
  let component: ReasonRejecComponent;
  let fixture: ComponentFixture<ReasonRejecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonRejecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonRejecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
