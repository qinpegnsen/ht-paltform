import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGoodsComponent } from './deliver';

describe('SendGoodsComponent', () => {
  let component: SendGoodsComponent;
  let fixture: ComponentFixture<SendGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
