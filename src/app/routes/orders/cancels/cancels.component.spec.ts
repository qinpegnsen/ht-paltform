import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelsComponent } from './cancels.component';

describe('CancelsComponent', () => {
  let component: CancelsComponent;
  let fixture: ComponentFixture<CancelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
