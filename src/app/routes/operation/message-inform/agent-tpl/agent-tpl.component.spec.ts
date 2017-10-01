import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTplComponent } from './agent-tpl.component';

describe('AgentTplComponent', () => {
  let component: AgentTplComponent;
  let fixture: ComponentFixture<AgentTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
