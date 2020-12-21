import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // We retrieve the token, if any
    const token = this.userService?.authorizedUser?.token || null;
    const tokenType = this.userService?.authorizedUser?.tokenType || 'Bearer';
    console.log('%authorizedUser:%o', 'color:red', this.userService.authorizedUser);
    console.log('%ctoken:%o', 'color:red', tokenType + ' ' + token);
    let newHeaders = req.headers;
    if (token) {
      // If we have a token, we append it to our new headers
      console.log('%Setting token now:%o', 'color:orange', tokenType + ' ' + token);
      newHeaders = newHeaders.append('Authorization', tokenType + ' ' + token);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({headers: newHeaders});
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    console.log('%cthis.userService.authorizedUser.token:%o', 'color:green', token);
    return next.handle(authReq);
  }
}
