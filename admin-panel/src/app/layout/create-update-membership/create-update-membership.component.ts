import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-update-membership',
  templateUrl: './create-update-membership.component.html',
  styleUrls: ['./create-update-membership.component.scss']
})
export class CreateUpdateMembershipComponent implements OnInit {
  loginForm: FormGroup;
  services: any[] = [ ];
  membership_id: any;
  currencies: any[] = ['SGD','USD'];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  loginError = '';

  ngOnInit() {
    this.buildForm();
    this.authService.retrieve('services').subscribe((res) => {
      if(res && res['data'] && res['data']){
        this.services = res['data'];
      }
    });
    if(this._activatedRoute.snapshot.params && this._activatedRoute.snapshot.params.membership_id) {
      this.membership_id = this._activatedRoute.snapshot.params.membership_id
      this.authService.retrieveById('memberships', this.membership_id).subscribe((res) => {
        if(res && res['data'] && res['data']['_id']){
          this.loginForm.patchValue({
            service_name: res['data']['service_name'],
            service_monthly: res['data']['service_monthly'],
            service_quarterly: res['data']['service_quarterly'],
            service_half_yearly: res['data']['service_half_yearly'],
            service_yearly: res['data']['service_yearly'],
            currency_used: res['data']['currency_used'],
          });
        }
      });
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      service_name: ['', [Validators.required]],
      service_monthly: ['', []],
      service_quarterly: ['', [Validators.required]],
      service_half_yearly: ['', [Validators.required]],
      service_yearly: ['', [Validators.required]],
      currency_used: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onLogin() {
    const obj = {
      service_name : this.loginForm.controls.service_name.value,
      service_monthly : this.loginForm.controls.service_monthly.value,
      service_quarterly : this.loginForm.controls.service_quarterly.value,
      service_half_yearly : this.loginForm.controls.service_half_yearly.value,
      service_yearly : this.loginForm.controls.service_yearly.value,
      currency_used : this.loginForm.controls.currency_used.value
    }
    if(this.membership_id){
      this.authService.update(obj, 'memberships', this.membership_id).subscribe((res) => {
        if (res && res['data'] && res['data']['_id']) {
          this.loginError = '';
          this.router.navigate(['/memberships']);
        } else {
          this.loginError = res['message'];
        }
      });
    } else {
      this.authService.create(obj, 'memberships').subscribe((res) => {
        if (res['_id']) {
          this.loginError = '';
          this.router.navigate(['/memberships']);
        } else {
          this.loginError = res['message'];
        }
      });
    }
  }
}
