import { TestBed } from '@angular/core/testing';

import { FotosLikeService } from './fotoslike.service';

describe('FotosLikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FotosLikeService = TestBed.get(FotosLikeService);
    expect(service).toBeTruthy();
  });
});
