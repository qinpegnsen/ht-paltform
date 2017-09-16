import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookLogisticsComponent } from './look-logistics.component';

describe('LookLogisticsComponent', () => {
  let component: LookLogisticsComponent;
  let fixture: ComponentFixture<LookLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
