import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseKindComponent } from './choose-kind.component';

describe('ChooseKindComponent', () => {
  let component: ChooseKindComponent;
  let fixture: ComponentFixture<ChooseKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
