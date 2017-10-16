import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformEditComponent } from './platform-edit.component';

describe('PlatformEditComponent', () => {
  let component: PlatformEditComponent;
  let fixture: ComponentFixture<PlatformEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
