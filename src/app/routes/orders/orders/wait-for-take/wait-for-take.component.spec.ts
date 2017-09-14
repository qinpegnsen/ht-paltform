import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForTakeComponent } from './wait-for-take.component';

describe('WaitForTakeComponent', () => {
  let component: WaitForTakeComponent;
  let fixture: ComponentFixture<WaitForTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
