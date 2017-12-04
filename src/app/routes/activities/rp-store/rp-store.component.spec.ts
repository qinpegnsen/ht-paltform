import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpStoreComponent } from './rp-store.component';

describe('RpStoreComponent', () => {
  let component: RpStoreComponent;
  let fixture: ComponentFixture<RpStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
