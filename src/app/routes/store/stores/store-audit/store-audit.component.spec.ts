import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAuditComponent } from './store-audit.component';

describe('StoreAuditComponent', () => {
  let component: StoreAuditComponent;
  let fixture: ComponentFixture<StoreAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
