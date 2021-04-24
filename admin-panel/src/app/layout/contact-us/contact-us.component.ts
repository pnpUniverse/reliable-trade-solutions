import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  loginForm: FormGroup;
  _id: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginError = '';

  ngOnInit() {
    this.buildForm();
    this.authService.retrieveBySlug('contact_us_content', 'contact_us_content').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this._id = res['data']['_id'];
        this.loginForm.patchValue({
          location: res['data']['location'],
          lat: res['data']['lat'],
          lng: res['data']['lng'],
          email: res['data']['email'],
          contact_no: res['data']['contact_no']
        });
      }
    });
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
    const obj = {
      location : this.loginForm.controls.location.value,
      lat : this.loginForm.controls.lat.value,
      lng : this.loginForm.controls.lng.value,
      email : this.loginForm.controls.email.value,
      contact_no : this.loginForm.controls.contact_no.value,
      slug: 'contact_us_content'
    }
    if(this._id){
      this.authService.update(obj, 'contact_us_content', this._id).subscribe((res) => {
        if (res['data']) {
          this.loginError = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = res['message'];
        }
      });
    } else {
      this.authService.create(obj, 'contact_us_content').subscribe((res) => {
        if (res['_id']) {
          this.loginError = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = res['message'];
        }
      });
    }
  }
}