import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSortComponent } from './article-sort.component';

describe('ArticleSortComponent', () => {
  let component: ArticleSortComponent;
  let fixture: ComponentFixture<ArticleSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
