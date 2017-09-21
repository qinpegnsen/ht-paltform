import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoFinishedComponent } from './wo-finished.component';

describe('WoFinishedComponent', () => {
  let component: WoFinishedComponent;
  let fixture: ComponentFixture<WoFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
