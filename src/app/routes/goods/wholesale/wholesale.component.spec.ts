import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesaleComponent } from './wholesale.component';

describe('WholesaleComponent', () => {
  let component: WholesaleComponent;
  let fixture: ComponentFixture<WholesaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
