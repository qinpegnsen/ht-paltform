import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformAllComponent } from './platform-all.component';

describe('PlatformAllComponent', () => {
  let component: PlatformAllComponent;
  let fixture: ComponentFixture<PlatformAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
