import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginError = '';

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onLogin() {
    const formData = new FormData();
    const obj = {
      email : this.loginForm.controls.email.value,
      password : this.loginForm.controls.password.value
    }
    this.authService.login(obj).subscribe((res) => {
      if (res['login']) {
        this.loginError = '';
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = res['message'];
      }
    });
  }
}
