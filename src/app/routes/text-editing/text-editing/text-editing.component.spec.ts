import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditingComponent } from './text-editing.component';

describe('TextEditingComponent', () => {
  let component: TextEditingComponent;
  let fixture: ComponentFixture<TextEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
