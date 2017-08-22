import { TestBed, inject } from '@angular/core/testing';

import { AddArticleManService } from './add-article-man.service';

describe('AddArticleManService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddArticleManService]
    });
  });

  it('should ...', inject([AddArticleManService], (service: AddArticleManService) => {
    expect(service).toBeTruthy();
  }));
});
