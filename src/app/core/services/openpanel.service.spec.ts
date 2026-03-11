import { TestBed } from '@angular/core/testing';

import { OpenpanelService } from './openpanel.service';

describe('OpenpanelService', () => {
  let service: OpenpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
