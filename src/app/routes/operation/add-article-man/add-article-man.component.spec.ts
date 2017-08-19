import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleManComponent } from './add-article-man.component';

describe('AddArticleManComponent', () => {
  let component: AddArticleManComponent;
  let fixture: ComponentFixture<AddArticleManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
