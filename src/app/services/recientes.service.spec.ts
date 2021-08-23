import { TestBed } from '@angular/core/testing';

import { RecienteService } from "./RecientesService";

describe('RecienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecienteService = TestBed.get(RecienteService);
    expect(service).toBeTruthy();
  });
});
