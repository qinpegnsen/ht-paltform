import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterEnsureComponent } from './after-ensure.component';

describe('AfterEnsureComponent', () => {
  let component: AfterEnsureComponent;
  let fixture: ComponentFixture<AfterEnsureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterEnsureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterEnsureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
