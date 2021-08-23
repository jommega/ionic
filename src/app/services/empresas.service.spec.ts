import { TestBed } from '@angular/core/testing';

import { CentrosService } from "./centros.services";

describe('CentrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentrosService = TestBed.get(CentrosService);
    expect(service).toBeTruthy();
  });
});
