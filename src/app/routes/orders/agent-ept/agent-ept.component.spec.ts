import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEptComponent } from './agent-ept.component';

describe('AgentEptComponent', () => {
  let component: AgentEptComponent;
  let fixture: ComponentFixture<AgentEptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentEptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentEptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
