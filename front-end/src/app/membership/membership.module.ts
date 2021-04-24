import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';


@NgModule({
  declarations: [MembershipComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    NgxPayPalModule
  ]
})
export class MembershipModule { }
