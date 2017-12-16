import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreeCashComponent } from './agree-cash.component';

describe('AgreeCashComponent', () => {
  let component: AgreeCashComponent;
  let fixture: ComponentFixture<AgreeCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreeCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreeCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
