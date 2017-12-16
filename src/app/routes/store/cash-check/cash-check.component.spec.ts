import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCheckComponent } from './cash-check.component';

describe('CashCheckComponent', () => {
  let component: CashCheckComponent;
  let fixture: ComponentFixture<CashCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
