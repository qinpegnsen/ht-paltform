import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSetComponent } from './app-set.component';

describe('AppSetComponent', () => {
  let component: AppSetComponent;
  let fixture: ComponentFixture<AppSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
