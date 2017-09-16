import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnControlComponent } from './return-control.component';

describe('ReturnControlComponent', () => {
  let component: ReturnControlComponent;
  let fixture: ComponentFixture<ReturnControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
