import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformTplComponent } from './platform-tpl.component';

describe('PlatformTplComponent', () => {
  let component: PlatformTplComponent;
  let fixture: ComponentFixture<PlatformTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
