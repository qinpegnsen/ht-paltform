import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAllComponent } from './store-all.component';

describe('StoreAllComponent', () => {
  let component: StoreAllComponent;
  let fixture: ComponentFixture<StoreAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
