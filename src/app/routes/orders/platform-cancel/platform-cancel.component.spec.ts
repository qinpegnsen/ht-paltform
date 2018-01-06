import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCancelComponent } from './platform-cancel.component';

describe('PlatformCancelComponent', () => {
  let component: PlatformCancelComponent;
  let fixture: ComponentFixture<PlatformCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
