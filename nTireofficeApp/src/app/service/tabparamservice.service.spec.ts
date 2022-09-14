import { TestBed } from '@angular/core/testing';

import { TabparamserviceService } from './tabparamservice.service';

describe('TabparamserviceService', () => {
  let service: TabparamserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabparamserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
