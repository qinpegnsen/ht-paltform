import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditBrandComponent } from './audit-brand.component';

describe('AuditBrandComponent', () => {
  let component: AuditBrandComponent;
  let fixture: ComponentFixture<AuditBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
