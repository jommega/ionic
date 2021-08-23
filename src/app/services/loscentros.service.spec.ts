import { TestBed } from '@angular/core/testing';

import { GotCentrosService } from "./loscentros.service";

describe('GotCentrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GotCentrosService = TestBed.get(GotCentrosService);
    expect(service).toBeTruthy();
  });
});
