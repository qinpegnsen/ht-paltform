import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForSendComponent } from './wait-for-send.component';

describe('WaitForSendComponent', () => {
  let component: WaitForSendComponent;
  let fixture: ComponentFixture<WaitForSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
