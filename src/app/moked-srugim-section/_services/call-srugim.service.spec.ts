import { TestBed } from '@angular/core/testing';

import { CallSrugimService } from './call-srugim.service';

describe('CallSrugimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallSrugimService = TestBed.get(CallSrugimService);
    expect(service).toBeTruthy();
  });
});
