import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReceivedComponent } from './platform-received.component';

describe('PlatformReceivedComponent', () => {
  let component: PlatformReceivedComponent;
  let fixture: ComponentFixture<PlatformReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
