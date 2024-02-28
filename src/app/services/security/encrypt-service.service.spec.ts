import { TestBed } from '@angular/core/testing';

import { EncryptServiceService } from './encrypt.service';

describe('EncryptServiceService', () => {
  let service: EncryptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
