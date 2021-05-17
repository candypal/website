import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizedUser, UserService} from '../user/user.service';

export function appInitializerFactory(appInitializerService: AppInitializerService): () => Promise<any> {
  return () => appInitializerService.isUserLoggedIn();
}

/**
 * Usages
 * {
      provide: APP_INITIALIZER,
      deps: [AppInitializerService],
      useFactory: appInitFactory,
      multi: true
    }
 */
@Injectable()
export class AppInitializerService {
  authorizedUser: AuthorizedUser | undefined;

  constructor(
    private userService: UserService,
    private injector: Injector
  ) {
  }

  // Separately need to inject Router service as its an angulare core service not SquareTrade developed service
  private get _router() {
    return this.injector.get(Router);
  }

  private get _localizationStoreService() {
    return this.injector.get(UserService);
  }

  isUserLoggedIn(): Promise<boolean> {
    // reject in promise is not allowing app to go forward, so reject is not used here.
    return new Promise<boolean>((resolve) => {
      // Check if the user token is there in the local storage
      this.authorizedUser = JSON.parse(localStorage.getItem('authorizedUser') || '') as AuthorizedUser;

      const expiresIn = this.authorizedUser.expiresIn || null;
      // Check if the user token is available and also valid
      if (this.authorizedUser &&
        this.authorizedUser.accessToken && (this.authorizedUser.expiresIn !== undefined && this.authorizedUser.expiresIn > (new Date().getTime()))) {
        resolve(true);
      } else {
        this.authorizedUser = this.userService.authorizedUser;
        if (this.authorizedUser && this.authorizedUser.accessToken
          && (this.authorizedUser.expiresIn !== undefined && this.authorizedUser.expiresIn > (new Date().getTime()))) {
          // localStorage.setItem('authorizedUser', JSON.stringify(this.authorizedUser));
          resolve(true);
        } else {
          // this.login();
          resolve(true);
        }
      }

    });
  }

}
