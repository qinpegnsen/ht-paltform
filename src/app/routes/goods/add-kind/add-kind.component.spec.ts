import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKindComponent } from './add-kind.component';

describe('AddKindComponent', () => {
  let component: AddKindComponent;
  let fixture: ComponentFixture<AddKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
