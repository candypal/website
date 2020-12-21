import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    // if logged in
    if (this.userService.isLoggedIn) {
      return true;
      // If not logged in but we want to attempt to initialize the user information
      // due to APP_INITIALIZER based authentication happening
    } else {
      this.router.navigate(['/login'], {
        replaceUrl: true,
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}
