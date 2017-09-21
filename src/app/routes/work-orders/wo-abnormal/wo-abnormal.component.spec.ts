import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoAbnormalComponent } from './wo-abnormal.component';

describe('WoAbnormalComponent', () => {
  let component: WoAbnormalComponent;
  let fixture: ComponentFixture<WoAbnormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoAbnormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoAbnormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
