import { TestBed } from '@angular/core/testing';

import { DynamicModalServiceService } from './dynamic-modal-service.service';

describe('DynamicModalServiceService', () => {
  let service: DynamicModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
