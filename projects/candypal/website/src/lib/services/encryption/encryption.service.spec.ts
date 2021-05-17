import {TestBed, inject} from '@angular/core/testing';

import {EncryptionService} from './encryption.service';
import {HttpClientModule} from "@angular/common/http";

describe('EncryptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        EncryptionService,
      ]
    });
  });

  it('should encrypt the user id', inject([EncryptionService], (service: EncryptionService) => {
    const encryptedValue = service.encryptAndGet('userid');
    expect(encryptedValue).not.toEqual('');
  }));
});
