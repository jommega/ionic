import { TestBed } from '@angular/core/testing';

import { VerfotosfavService } from './verfotosfav.service';

describe('VerfotosfavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerfotosfavService = TestBed.get(VerfotosfavService);
    expect(service).toBeTruthy();
  });
});
