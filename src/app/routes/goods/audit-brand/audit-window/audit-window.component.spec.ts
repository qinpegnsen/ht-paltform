import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditWindowComponent } from './audit-window.component';

describe('AuditWindowComponent', () => {
  let component: AuditWindowComponent;
  let fixture: ComponentFixture<AuditWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
