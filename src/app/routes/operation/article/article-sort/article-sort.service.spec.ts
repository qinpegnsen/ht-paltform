import { TestBed, inject } from '@angular/core/testing';

import { ArticleSortService } from './article-sort.service';

describe('ArticleSortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleSortService]
    });
  });

  it('should ...', inject([ArticleSortService], (service: ArticleSortService) => {
    expect(service).toBeTruthy();
  }));
});
