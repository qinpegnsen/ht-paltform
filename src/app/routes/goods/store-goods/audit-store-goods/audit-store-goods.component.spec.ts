import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStoreGoodsComponent } from './audit-store-goods.component';

describe('AuditStoreGoodsComponent', () => {
  let component: AuditStoreGoodsComponent;
  let fixture: ComponentFixture<AuditStoreGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditStoreGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditStoreGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
