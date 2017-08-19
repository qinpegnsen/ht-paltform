import { TestBed, inject } from '@angular/core/testing';

import { ArticleSortDelService } from './article-sort-del.service';

describe('ArticleSortDelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleSortDelService]
    });
  });

  it('should ...', inject([ArticleSortDelService], (service: ArticleSortDelService) => {
    expect(service).toBeTruthy();
  }));
});
