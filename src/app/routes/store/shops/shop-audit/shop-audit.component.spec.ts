import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAuditComponent } from './shop-audit.component';

describe('ShopAuditComponent', () => {
  let component: ShopAuditComponent;
  let fixture: ComponentFixture<ShopAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
