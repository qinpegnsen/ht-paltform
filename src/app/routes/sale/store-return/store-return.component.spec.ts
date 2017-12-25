import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReturnComponent } from './store-return.component';

describe('StoreReturnComponent', () => {
  let component: StoreReturnComponent;
  let fixture: ComponentFixture<StoreReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
