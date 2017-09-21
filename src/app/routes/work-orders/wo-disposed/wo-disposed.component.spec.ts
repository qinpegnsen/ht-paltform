import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoDisposedComponent } from './wo-disposed.component';

describe('WoDisposedComponent', () => {
  let component: WoDisposedComponent;
  let fixture: ComponentFixture<WoDisposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoDisposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoDisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
