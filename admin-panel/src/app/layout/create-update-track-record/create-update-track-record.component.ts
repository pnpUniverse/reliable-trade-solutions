import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-track-record',
  templateUrl: './create-update-track-record.component.html',
  styleUrls: ['./create-update-track-record.component.scss']
})
export class CreateUpdateTrackRecordComponent implements OnInit {
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
      location: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact_no: ['', [Validators.required]]
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onLogin() {
    const formData = new FormData();
    const obj = {
      location : this.loginForm.controls.location.value,
      lat : this.loginForm.controls.lat.value,
      lng : this.loginForm.controls.lng.value,
      email : this.loginForm.controls.email.value,
      contact_no : this.loginForm.controls.contact_no.value
    }
    // ['firstName', 'lastName', 'email', 'Password'].map(d => formData.append(d, this.f[d]));

    this.authService.register(obj).subscribe((res) => {
      console.log('res: ', res);
      if (res['login']) {
        this.loginError = '';
        // localStorage.setItem('isLoggedin', 'true');
        // localStorage.setItem('token', res['token']);
        // this.router.navigate(['/dashboard']);
      } else {
        this.loginError = res['message'];
      }
    });
  }
}
