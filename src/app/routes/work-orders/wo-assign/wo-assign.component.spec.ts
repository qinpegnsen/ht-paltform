import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoAssignComponent } from './wo-assign.component';

describe('WoAssignComponent', () => {
  let component: WoAssignComponent;
  let fixture: ComponentFixture<WoAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
