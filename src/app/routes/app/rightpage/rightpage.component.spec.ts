import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightpageComponent } from './rightpage.component';

describe('RightpageComponent', () => {
  let component: RightpageComponent;
  let fixture: ComponentFixture<RightpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
