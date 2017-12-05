import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpDetailComponent } from './rp-detail.component';

describe('RpDetailComponent', () => {
  let component: RpDetailComponent;
  let fixture: ComponentFixture<RpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
