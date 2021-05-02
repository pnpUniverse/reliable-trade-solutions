import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastNotificationsModule } from "ngx-toast-notifications";
// import { NgxPayPalModule } from 'ngx-paypal';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

@NgModule({
  declarations: [
    AppComponent,
    RefundPolicyComponent,
    TermsAndConditionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

    // NgxPayPalModule