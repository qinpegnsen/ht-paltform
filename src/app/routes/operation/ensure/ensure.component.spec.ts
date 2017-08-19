import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsureComponent } from './ensure.component';

describe('EnsureComponent', () => {
  let component: EnsureComponent;
  let fixture: ComponentFixture<EnsureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
