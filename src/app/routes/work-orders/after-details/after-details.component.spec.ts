import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterDetailsComponent } from './after-details.component';

describe('AfterDetailsComponent', () => {
  let component: AfterDetailsComponent;
  let fixture: ComponentFixture<AfterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
