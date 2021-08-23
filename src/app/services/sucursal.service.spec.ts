import { TestBed } from '@angular/core/testing';

import { SucursalService } from "./sucursal.service";

describe('ProveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SucursalService = TestBed.get(SucursalService);
    expect(service).toBeTruthy();
  });
});
