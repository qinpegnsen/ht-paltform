import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPwComponent } from './edit-pw.component';

describe('EditPwComponent', () => {
  let component: EditPwComponent;
  let fixture: ComponentFixture<EditPwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
