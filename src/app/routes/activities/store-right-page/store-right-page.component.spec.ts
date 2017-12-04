import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRightPageComponent } from './store-right-page.component';

describe('StoreRightPageComponent', () => {
  let component: StoreRightPageComponent;
  let fixture: ComponentFixture<StoreRightPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreRightPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
