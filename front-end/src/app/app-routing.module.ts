import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) }, 
  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) }, 
  { path: 'performance', loadChildren: () => import('./track-record/track-record.module').then(m => m.TrackRecordModule) }, 
  { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) }, 
  { path: 'membership', loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule) }, 
  { path: 'privacy_policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'terms_and_condition', loadChildren: () => import('./terms-and-condition/terms-and-condition.module').then(m => m.TermsAndConditionModule) },
  { path: 'refund_policy', loadChildren: () => import('./refund-policy/refund-policy.module').then(m => m.RefundPolicyModule) },
  { path: 'disclaimer', loadChildren: () => import('./disclaimer/disclaimer.module').then(m => m.DisclaimerModule) }
];
  // ,{ path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) }


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
