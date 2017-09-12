import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationChangeComponent } from './integration-change.component';

describe('IntegrationChangeComponent', () => {
  let component: IntegrationChangeComponent;
  let fixture: ComponentFixture<IntegrationChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
