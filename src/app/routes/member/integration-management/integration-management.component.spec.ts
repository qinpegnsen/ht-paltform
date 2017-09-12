import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationManagementComponent } from './integration-management.component';

describe('IntegrationManagementComponent', () => {
  let component: IntegrationManagementComponent;
  let fixture: ComponentFixture<IntegrationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
