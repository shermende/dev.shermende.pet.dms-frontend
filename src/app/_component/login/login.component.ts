import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../_service/authentication.service';
import {SupportForm} from '../support/support-form';
import {Location} from '@angular/common';
import {ErrorService} from '../../_service/error-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SupportForm implements OnInit {

  constructor(
    protected location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService,
  ) {
    super(location);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authenticationService.login(this.form.controls.username.value, this.form.controls.password.value)
      .subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          this.errorService.login({});
        });
  }

}
