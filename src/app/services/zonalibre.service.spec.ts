import { TestBed } from '@angular/core/testing';

import { GotZonaLibreService } from "./zonalibre.service";

describe('GotCentrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GotZonaLibreService = TestBed.get(GotZonaLibreService);
    expect(service).toBeTruthy();
  });
});
