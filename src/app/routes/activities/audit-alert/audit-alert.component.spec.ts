import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAlertComponent } from './audit-alert.component';

describe('AuditAlertComponent', () => {
  let component: AuditAlertComponent;
  let fixture: ComponentFixture<AuditAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
