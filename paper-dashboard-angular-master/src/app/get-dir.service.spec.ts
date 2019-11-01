import { TestBed } from '@angular/core/testing';

import { GetDirService } from './get-dir.service';

describe('GetDirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDirService = TestBed.get(GetDirService);
    expect(service).toBeTruthy();
  });
});
