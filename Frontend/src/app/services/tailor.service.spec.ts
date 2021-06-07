import { TestBed } from '@angular/core/testing';

import { TailorService } from './tailor.service';

describe('TailorService', () => {
  let service: TailorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
