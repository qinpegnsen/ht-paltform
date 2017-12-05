import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpPondComponent } from './rp-pond.component';

describe('RpPondComponent', () => {
  let component: RpPondComponent;
  let fixture: ComponentFixture<RpPondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpPondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpPondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
