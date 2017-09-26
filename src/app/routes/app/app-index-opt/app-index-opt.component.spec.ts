import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIndexOptComponent } from './app-index-opt.component';

describe('AppIndexOptComponent', () => {
  let component: AppIndexOptComponent;
  let fixture: ComponentFixture<AppIndexOptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppIndexOptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIndexOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
