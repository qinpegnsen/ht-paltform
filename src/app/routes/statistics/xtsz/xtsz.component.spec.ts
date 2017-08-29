import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XtszComponent } from './xtsz.component';

describe('XtszComponent', () => {
  let component: XtszComponent;
  let fixture: ComponentFixture<XtszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XtszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XtszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
