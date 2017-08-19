import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleSortComponent } from './add-article-sort.component';

describe('AddArticleSortComponent', () => {
  let component: AddArticleSortComponent;
  let fixture: ComponentFixture<AddArticleSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
