import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {EncryptionService} from '../encryption/encryption.service';

describe('CurrentUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: EncryptionService,
          useValue: {
            encryptAndGet:
              jasmine.createSpy('encryptAndGet').and.returnValue('encryptedUserIdentifier')
          }
        }]
    });
  });

  it('should populate encrypted user', inject([UserService, EncryptionService],
    (service: UserService, encryptionService: EncryptionService) => {
      const spyEncrypt = (<jasmine.Spy>encryptionService.encryptAndGet);
      // this proves that we proply set and sent the observable info.
      service.user.subscribe((userInfo) => {
        expect(userInfo).toEqual(service.userAuthorizations);
      });
      service.getCurrentUser({}).subscribe((data) => {
        expect(data).toEqual({
          userId: 'userid'
        });
        expect(spyEncrypt).toHaveBeenCalledWith('userid');
        expect(service.encryptedUserIdentifier).toBe('encryptedUserIdentifier');
        expect(service.userAuthorizations).toEqual({
          userId: 'userid'
        });
      });
    }));

  it('should return truthy isAuthenticated if user information exists', inject([UserService],
    (service: UserService) => {
      service.userAuthorizations = {
        userId: 'userid'
      };

      expect(service.isAuthenticated).toBeTruthy();
    }));

  it('should return falsey isAuthenticated if user information doens\'t exist', inject([UserService],
    (service: UserService) => {
      // no userAuthrizations
      expect(service.isAuthenticated).toBeFalsy();

      service.userAuthorizations = {userId: ''};
      // user authorizations but no userId set in them
      expect(service.isAuthenticated).toBeFalsy();
    }));
});
