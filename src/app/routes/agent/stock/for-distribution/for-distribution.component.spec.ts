import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForDistributionComponent } from './for-distribution.component';

describe('ForDistributionComponent', () => {
  let component: ForDistributionComponent;
  let fixture: ComponentFixture<ForDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
