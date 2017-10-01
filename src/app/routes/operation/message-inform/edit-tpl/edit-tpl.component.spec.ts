import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTplComponent } from './edit-tpl.component';

describe('EditTplComponent', () => {
  let component: EditTplComponent;
  let fixture: ComponentFixture<EditTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
