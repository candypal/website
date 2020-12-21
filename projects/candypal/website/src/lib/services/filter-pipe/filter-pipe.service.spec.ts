import { TestBed, inject } from '@angular/core/testing';

import { FilterPipe } from './filter-pipe.service';

describe('FilterPipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterPipe]
    });
  });

  it('should be created', inject([FilterPipe], (service: FilterPipe) => {
    expect(service).toBeTruthy();
  }));
});
