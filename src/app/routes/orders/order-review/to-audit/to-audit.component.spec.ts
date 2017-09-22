import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAuditComponent } from './to-audit.component';

describe('ToAuditComponent', () => {
  let component: ToAuditComponent;
  let fixture: ComponentFixture<ToAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
