import { TestBed } from '@angular/core/testing';

import { PlazaService } from "./plaza.services";

describe('PlazaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlazaService = TestBed.get(PlazaService);
    expect(service).toBeTruthy();
  });
});
