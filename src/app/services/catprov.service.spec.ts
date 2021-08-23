import { TestBed } from '@angular/core/testing';

import { CatprovService } from './catprov.service';

describe('CatprovService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatprovService = TestBed.get(CatprovService);
    expect(service).toBeTruthy();
  });
});
