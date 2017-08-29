import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeUsersComponent } from './analyze-users.component';

describe('AnalyzeUsersComponent', () => {
  let component: AnalyzeUsersComponent;
  let fixture: ComponentFixture<AnalyzeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
