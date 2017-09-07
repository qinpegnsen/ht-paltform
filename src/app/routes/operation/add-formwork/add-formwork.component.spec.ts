import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormworkComponent } from './add-formwork.component';

describe('AddFormworkComponent', () => {
  let component: AddFormworkComponent;
  let fixture: ComponentFixture<AddFormworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
