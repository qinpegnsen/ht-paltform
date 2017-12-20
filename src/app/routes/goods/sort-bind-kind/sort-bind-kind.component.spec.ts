import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortBindKindComponent } from './sort-bind-kind.component';

describe('SortBindKindComponent', () => {
  let component: SortBindKindComponent;
  let fixture: ComponentFixture<SortBindKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortBindKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortBindKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
