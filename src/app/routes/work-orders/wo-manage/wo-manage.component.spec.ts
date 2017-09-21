import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoManageComponent } from './wo-manage.component';

describe('WoManageComponent', () => {
  let component: WoManageComponent;
  let fixture: ComponentFixture<WoManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
