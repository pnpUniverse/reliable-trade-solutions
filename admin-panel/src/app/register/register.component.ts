import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
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
      firstName : this.loginForm.controls.firstName.value,
      lastName : this.loginForm.controls.lastName.value,
      email : this.loginForm.controls.email.value,
      password : this.loginForm.controls.password.value
    }
    // ['firstName', 'lastName', 'email', 'Password'].map(d => formData.append(d, this.f[d]));

    this.authService.register(obj).subscribe((res) => {
      if (res['status']) {
        this.loginError = '';
        this.router.navigate(['/login']);
      } else {
        this.loginError = res['message'];
      }
    });
  }
}
