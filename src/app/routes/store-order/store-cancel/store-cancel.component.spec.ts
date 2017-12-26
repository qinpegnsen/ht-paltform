import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCancelComponent } from './store-cancel.component';

describe('StoreCancelComponent', () => {
  let component: StoreCancelComponent;
  let fixture: ComponentFixture<StoreCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
