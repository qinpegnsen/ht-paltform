import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIndexTplComponent } from './app-index-tpl.component';

describe('AppIndexTplComponent', () => {
  let component: AppIndexTplComponent;
  let fixture: ComponentFixture<AppIndexTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppIndexTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIndexTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
