import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserService} from '../../services/user/user.service';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'cfs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginSubmitClicked = new EventEmitter<User>();
  public loading = false;
  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public returnUrl: string = '/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userService.loginSubmittedUserSubject
        .next({email: this.loginForm.value.email, password: this.loginForm.value.password} as User);
      this.loginSubmitClicked.emit({email: this.loginForm.value.username, password: this.loginForm.value.password} as User);
    }
  }

}
