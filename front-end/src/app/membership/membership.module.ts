import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MembershipComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembershipRoutingModule,
    NgxPayPalModule
  ]
})
export class MembershipModule { }
