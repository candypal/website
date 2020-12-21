import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  useBasicAuth: boolean = false;
  constructor(
    private currentUserService: UserService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.useBasicAuth) {
      return true;
    } else {
      this.router.navigate(['/'], {
        replaceUrl: true,
      });
      return false;
    }
  }
}
