import { TestBed, inject } from '@angular/core/testing';

import { AddArticleSortService } from './add-article-sort.service';

describe('AddArticleSortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddArticleSortService]
    });
  });

  it('should ...', inject([AddArticleSortService], (service: AddArticleSortService) => {
    expect(service).toBeTruthy();
  }));
});
