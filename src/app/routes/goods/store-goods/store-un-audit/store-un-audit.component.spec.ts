import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUnAuditComponent } from './store-un-audit.component';

describe('StoreUnAuditComponent', () => {
  let component: StoreUnAuditComponent;
  let fixture: ComponentFixture<StoreUnAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreUnAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreUnAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
