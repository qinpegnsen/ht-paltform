import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuGoodsComponent } from './sku-goods.component';

describe('SkuGoodsComponent', () => {
  let component: SkuGoodsComponent;
  let fixture: ComponentFixture<SkuGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
