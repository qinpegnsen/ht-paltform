import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoDealComponent } from './wo-deal.component';

describe('WoDealComponent', () => {
  let component: WoDealComponent;
  let fixture: ComponentFixture<WoDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
