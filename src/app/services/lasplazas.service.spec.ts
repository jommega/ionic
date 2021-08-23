import { TestBed } from '@angular/core/testing';

import { GotPlazasService } from "./lasplazas.service";

describe('GotPlazasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GotPlazasService = TestBed.get(GotPlazasService);
    expect(service).toBeTruthy();
  });
});
