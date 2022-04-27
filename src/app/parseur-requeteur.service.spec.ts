import { TestBed } from '@angular/core/testing';

import { ParseurRequeteurService } from './parseur-requeteur.service';

describe('ParseurRequeteurService', () => {
  let service: ParseurRequeteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseurRequeteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
