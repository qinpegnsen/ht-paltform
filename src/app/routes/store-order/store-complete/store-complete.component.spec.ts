import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCompleteComponent } from './store-complete.component';

describe('StoreCompleteComponent', () => {
  let component: StoreCompleteComponent;
  let fixture: ComponentFixture<StoreCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
