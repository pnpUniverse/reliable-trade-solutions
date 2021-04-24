import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { ToastNotificationsModule } from "ngx-toast-notifications";
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
  	ReactiveFormsModule,
    CommonModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
