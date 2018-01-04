import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightAlertComponent } from './weight-alert.component';

describe('WeightAlertComponent', () => {
  let component: WeightAlertComponent;
  let fixture: ComponentFixture<WeightAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
