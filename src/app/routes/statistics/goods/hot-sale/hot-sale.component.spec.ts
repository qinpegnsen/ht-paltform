import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotSaleComponent } from './hot-sale.component';

describe('HotSaleComponent', () => {
  let component: HotSaleComponent;
  let fixture: ComponentFixture<HotSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
