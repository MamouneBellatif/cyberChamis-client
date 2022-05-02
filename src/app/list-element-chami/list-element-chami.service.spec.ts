import { TestBed } from '@angular/core/testing';

import { ListElementChamiService } from './list-element-chami.service';

describe('ListElementChamiService', () => {
  let service: ListElementChamiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListElementChamiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
