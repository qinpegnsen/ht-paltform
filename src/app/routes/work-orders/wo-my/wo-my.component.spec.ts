import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoMyComponent } from './wo-my.component';

describe('WoMyComponent', () => {
  let component: WoMyComponent;
  let fixture: ComponentFixture<WoMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
