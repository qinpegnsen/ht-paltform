import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentpersonComponent } from './agentperson.component';

describe('AgentpersonComponent', () => {
  let component: AgentpersonComponent;
  let fixture: ComponentFixture<AgentpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
