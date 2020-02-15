import { TestBed } from '@angular/core/testing';

import { Es11Service } from './es11.service';

describe('Es11Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Es11Service = TestBed.get(Es11Service);
    expect(service).toBeTruthy();
  });
});
