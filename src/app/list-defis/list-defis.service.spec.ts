import { TestBed } from '@angular/core/testing';

import { ListDefisService } from './list-defis.service';

describe('ListDefisService', () => {
  let service: ListDefisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDefisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
