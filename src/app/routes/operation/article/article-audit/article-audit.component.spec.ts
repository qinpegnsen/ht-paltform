import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAuditComponent } from './article-audit.component';

describe('ArticleAuditComponent', () => {
  let component: ArticleAuditComponent;
  let fixture: ComponentFixture<ArticleAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
