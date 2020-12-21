import { TestBed, inject } from '@angular/core/testing';

import { CfsInfiniteScrollService } from './cfs-infinite-scroll.service';

describe('CfsInfiniteScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CfsInfiniteScrollService]
    });
  });

  it('should be created', inject([CfsInfiniteScrollService], (service: CfsInfiniteScrollService) => {
    expect(service).toBeTruthy();
  }));
});
