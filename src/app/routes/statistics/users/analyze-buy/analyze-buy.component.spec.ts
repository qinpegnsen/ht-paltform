import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeBuyComponent } from './analyze-buy.component';

describe('AnalyzeBuyComponent', () => {
  let component: AnalyzeBuyComponent;
  let fixture: ComponentFixture<AnalyzeBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
