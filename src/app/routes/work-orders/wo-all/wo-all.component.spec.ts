import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoAllComponent } from './wo-all.component';

describe('WoAllComponent', () => {
  let component: WoAllComponent;
  let fixture: ComponentFixture<WoAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
