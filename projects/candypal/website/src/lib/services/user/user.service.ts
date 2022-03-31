import {Inject, Injectable, Optional} from '@angular/core';
import {EncryptionService} from '../encryption/encryption.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, Subject} from 'rxjs';
import {WebsiteEnvironmentConfigs} from "../../interfaces/website-environment-configs";

export interface User {
  authorized?: Array<string>;
  created?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  modified?: string;
  password?: string;
  phone?: string;
  error?: string;
  status?: string;
}

export interface AuthorizedUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  token?: string;
  tokenType?: string;
  scope?: string;
  expiresIn?: number;
  state?: string;
  idToken?: string;
  authorized?: Array<string>;
  accessToken?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loginSubmittedUserSubject: Subject<User> = new Subject<User>();
  public authorizedUserSubject: Subject<AuthorizedUser> = new Subject<AuthorizedUser>();
  public isLoggedIn = false;
  public authorizedUser: AuthorizedUser | undefined;
  public encryptedUserIdentifier: string = '';
  public allowedDomainToAddToken: Array<string> = [];

  constructor(
    @Optional() @Inject('websiteEnvironment') private websiteEnvironment: WebsiteEnvironmentConfigs,
    private encryptionService: EncryptionService,
    private httpClient: HttpClient
  ) {
  }

  login(loginPayload: Object): Observable<any> {
    return this.httpClient
      .post(this.websiteEnvironment.loginUrl, loginPayload)
      .pipe(
        map((response: AuthorizedUser) => {
          localStorage.setItem('authorizedUser', JSON.stringify(response));
          this.authorizedUser = response;
          this.authorizedUserSubject.next(response);
          this.isLoggedIn = true;
          return response;
        }),
        catchError((error) => {
          this.authorizedUserSubject.next({
            error: error.toString(),
          });
          return of(error);
        })
      );
  }

  makeLogout() {
    localStorage.removeItem('authorizedUser');
    this.authorizedUserSubject.next({});
    this.isLoggedIn = false;
    this.authorizedUser = undefined;
  }

}
