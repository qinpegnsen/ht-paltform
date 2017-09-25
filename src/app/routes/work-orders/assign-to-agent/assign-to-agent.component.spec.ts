import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToAgentComponent } from './assign-to-agent.component';

describe('AssignToAgentComponent', () => {
  let component: AssignToAgentComponent;
  let fixture: ComponentFixture<AssignToAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignToAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
