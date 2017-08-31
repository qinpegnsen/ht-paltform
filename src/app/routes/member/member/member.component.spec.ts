import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MumberComponent } from './member.component';

describe('MumberComponent', () => {
  let component: MumberComponent;
  let fixture: ComponentFixture<MumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
