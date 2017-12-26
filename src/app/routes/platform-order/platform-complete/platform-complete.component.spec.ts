import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCompleteComponent } from './platform-complete.component';

describe('PlatformCompleteComponent', () => {
  let component: PlatformCompleteComponent;
  let fixture: ComponentFixture<PlatformCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
