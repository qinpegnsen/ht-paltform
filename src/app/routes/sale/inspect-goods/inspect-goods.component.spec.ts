import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectGoodsComponent } from './inspect-goods.component';

describe('InspectGoodsComponent', () => {
  let component: InspectGoodsComponent;
  let fixture: ComponentFixture<InspectGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
