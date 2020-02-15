import { TestBed } from '@angular/core/testing';

import { SoccerService } from './soccer.service';

describe('SoccerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoccerService = TestBed.get(SoccerService);
    expect(service).toBeTruthy();
  });
});
