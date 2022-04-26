import { TestBed } from '@angular/core/testing';

import { CyberchamisService } from './cyberchamis.service';

describe('CyberchamisService', () => {
  let service: CyberchamisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyberchamisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
