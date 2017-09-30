import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityPriceComponent } from './commodity-price.component';

describe('CommodityPriceComponent', () => {
  let component: CommodityPriceComponent;
  let fixture: ComponentFixture<CommodityPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
