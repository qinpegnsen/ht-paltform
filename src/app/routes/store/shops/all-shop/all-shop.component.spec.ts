import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShopComponent } from './all-shop.component';

describe('AllShopComponent', () => {
  let component: AllShopComponent;
  let fixture: ComponentFixture<AllShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
