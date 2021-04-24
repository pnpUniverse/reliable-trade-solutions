import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: any;
  cookieValue;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

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

  loginUser() {
    const formData = new FormData();
    ['email', 'password'].map(d => formData.append(d, this.f[d]));

    this.authService.login(formData).subscribe((res) => {
      if (res['login']) { 
        this.router.navigateByUrl('/'); 
      }
    });
  }

  isRemebered(evn){
    console.log('evn is : ', evn.target.value)
  }
}
