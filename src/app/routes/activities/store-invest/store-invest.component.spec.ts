import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInvestComponent } from './store-invest.component';

describe('StoreInvestComponent', () => {
  let component: StoreInvestComponent;
  let fixture: ComponentFixture<StoreInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
