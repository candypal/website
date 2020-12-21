import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {UserService} from '../../services/user/user.service';
import {Observable, of} from 'rxjs';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {inject} from '@angular/core/testing';

import {} from 'jasmine';

describe('Logincomponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        ActivatedRoute,
        {
          provide: UserService,
          useValue: {
            getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({}))
          }
        },
        {
          provide: AlertService, useValue: {alert: jasmine.createSpy('alert')}
        },
        Router
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component.returnUrl).toEqual('/');
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.username).toBe(component.loginForm.controls['username']);
    expect(component.password).toBe(component.loginForm.controls['password']);
    expect(component.username.validator.bind(null).toString()).toBe(Validators.required.bind(null).toString());
    expect(component.password.validator.bind(null).toString()).toBe(Validators.required.bind(null).toString());
  });

  it('should should set returnUrl onInit', inject([ActivatedRoute], (route: Router) => {
    /*route..queryParams = {
      returnUrl: 'testUrl/test'
    };*/
    fixture.detectChanges();
    // sets the return url properly
    expect(component.returnUrl).toEqual('testUrl/test');
  }));


  it('should submit login form on submit', inject([Router, UserService], (router: Router, c: UserService) => {
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue('testusername');
    component.loginForm.controls['password'].setValue('testpassword');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
    expect(c.getCurrentUser).toHaveBeenCalledWith('testusername', 'testpassword');
    // replace the current URL so that /login is not in the state history.
    expect(router.navigateByUrl).toHaveBeenCalledWith(component.returnUrl, {replaceUrl: true});
    expect(component.loading).toBe(false);
  }));

  it('should show error on unsucessful login', inject([Router, AlertService, UserService],
    (r: Router, a: AlertService, c: UserService) => {
      (c.getCurrentUser as jasmine.Spy).and.returnValue(Observable.throw('login http error'));
      fixture.detectChanges();
      component.loginForm.controls['username'].setValue('testusername');
      component.loginForm.controls['password'].setValue('testpassword');
      component.onSubmit();
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTruthy();
      expect(c.getCurrentUser).toHaveBeenCalledWith('testusername', 'testpassword');
      expect(r.navigateByUrl).not.toHaveBeenCalled();
      expect(a.alert).toHaveBeenCalledWith({
        title: 'Login failure!',
        subTitle: 'Unable to login! Please try again or contact support team.',
        text: 'login http error',
        type: 'danger'
      });
      expect(component.loading).toBe(false);
    }));

  it('should fail submit login form without username and password', inject([UserService], (c: UserService) => {
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
    expect(c.getCurrentUser).not.toHaveBeenCalled();
    expect(component.loading).toBe(false);
  }));
});
