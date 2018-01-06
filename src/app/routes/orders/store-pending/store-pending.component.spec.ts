import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePendingComponent } from './store-pending.component';

describe('StorePendingComponent', () => {
  let component: StorePendingComponent;
  let fixture: ComponentFixture<StorePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
