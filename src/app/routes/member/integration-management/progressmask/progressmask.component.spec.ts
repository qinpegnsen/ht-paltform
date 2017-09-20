import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressmaskComponent } from './progressmask.component';

describe('ProgressmaskComponent', () => {
  let component: ProgressmaskComponent;
  let fixture: ComponentFixture<ProgressmaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressmaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressmaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
