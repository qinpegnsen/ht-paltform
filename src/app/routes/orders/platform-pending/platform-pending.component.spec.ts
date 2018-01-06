import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformPendingComponent } from './platform-pending.component';

describe('PlatformPendingComponent', () => {
  let component: PlatformPendingComponent;
  let fixture: ComponentFixture<PlatformPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
