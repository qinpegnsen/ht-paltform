import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeAreaComponent } from './analyze-area.component';

describe('AnalyzeAreaComponent', () => {
  let component: AnalyzeAreaComponent;
  let fixture: ComponentFixture<AnalyzeAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
