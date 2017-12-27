import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuditComponent } from './un-audit.component';

describe('UnAuditComponent', () => {
  let component: UnAuditComponent;
  let fixture: ComponentFixture<UnAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
