import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoAssignedComponent } from './wo-assigned.component';

describe('WoAssignedComponent', () => {
  let component: WoAssignedComponent;
  let fixture: ComponentFixture<WoAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
