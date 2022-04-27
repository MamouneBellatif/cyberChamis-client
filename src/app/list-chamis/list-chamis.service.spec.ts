import { TestBed } from '@angular/core/testing';

import { ListChamisService } from './list-chamis.service';

describe('ListChamisService', () => {
  let service: ListChamisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListChamisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
