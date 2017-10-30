import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataValComponent } from './data-val.component';

describe('DataValComponent', () => {
  let component: DataValComponent;
  let fixture: ComponentFixture<DataValComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataValComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
