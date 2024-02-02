import {inject, TestBed} from '@angular/core/testing';

import {appInitFactory, AppInitService} from './app-init.service';
import {of} from "rxjs";

describe('AppInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppInitService,
          useClass: AppInitService,
        }
      ]
    });
  });

  it('should return config\'s loaded response', inject([AppInitService],
    (service: AppInitService) => {

      expect(service).toBeTruthy();
      service.load().subscribe((resp) => {
        expect(resp).toEqual({
          'restBaseUri': 'testUri'
        });
      });

    }));

  describe('App Init Factory', () => {
    it('should convert AppInitService load into Promise for the App_Initializer',
      inject([AppInitService], (init: AppInitService) => {
        spyOn(init, 'load').and.returnValue(of('test value'));

        const promiseFactory = appInitFactory(init);
        expect(typeof promiseFactory).toBe('function');
        // have to actually call the function that it returns to make sure it returns a promse.
        const promise = promiseFactory();
        expect(init.load).toHaveBeenCalled();
      }));
  });
});
