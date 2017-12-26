import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReceivedComponent } from './store-received.component';

describe('StoreReceivedComponent', () => {
  let component: StoreReceivedComponent;
  let fixture: ComponentFixture<StoreReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
