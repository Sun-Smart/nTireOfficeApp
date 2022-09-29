import { TestBed } from '@angular/core/testing';

import { TableSampleService } from './table-sample.service';

describe('TableSampleService', () => {
  let service: TableSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
