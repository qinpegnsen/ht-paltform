import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDetailComponent } from './audit-detail.component';

describe('AuditDetailComponent', () => {
  let component: AuditDetailComponent;
  let fixture: ComponentFixture<AuditDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
