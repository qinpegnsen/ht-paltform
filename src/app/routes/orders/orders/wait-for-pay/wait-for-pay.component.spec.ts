import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForPayComponent } from './wait-for-pay.component';

describe('WaitForPayComponent', () => {
  let component: WaitForPayComponent;
  let fixture: ComponentFixture<WaitForPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
