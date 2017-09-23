import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuccessComponent } from './cuccess.component';

describe('CuccessComponent', () => {
  let component: CuccessComponent;
  let fixture: ComponentFixture<CuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
