import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpInterlocutionComponent } from './help-interlocution.component';

describe('HelpInterlocutionComponent', () => {
  let component: HelpInterlocutionComponent;
  let fixture: ComponentFixture<HelpInterlocutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpInterlocutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpInterlocutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
