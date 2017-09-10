import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUpdateComponent } from './help-update.component';

describe('HelpUpdateComponent', () => {
  let component: HelpUpdateComponent;
  let fixture: ComponentFixture<HelpUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
