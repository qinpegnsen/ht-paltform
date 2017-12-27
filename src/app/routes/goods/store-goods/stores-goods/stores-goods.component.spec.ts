import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresGoodsComponent } from './stores-goods.component';

describe('StoresGoodsComponent', () => {
  let component: StoresGoodsComponent;
  let fixture: ComponentFixture<StoresGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
