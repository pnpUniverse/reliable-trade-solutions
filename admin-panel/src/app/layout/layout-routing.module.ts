import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'about_us',
                loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
            },
            {
                path: 'contact_us',
                loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
            },
            {
                path: 'home',
                loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
            },
            {
                path: 'create_service',
                loadChildren: () => import('./create-update-service/create-update-service.module').then(m => m.CreateUpdateServiceModule)
            },
            {
                path: 'edit_service/:service_id',
                loadChildren: './create-update-service/create-update-service.module#CreateUpdateServiceModule'
            },
            {
                path: 'create_membership',
                loadChildren: () => import('./create-update-membership/create-update-membership.module').then(m => m.CreateUpdateMembershipModule)
            },
            {
                path: 'edit_membership/:membership_id',
                loadChildren: () => import('./create-update-membership/create-update-membership.module').then(m => m.CreateUpdateMembershipModule)
            },
            {
                path: 'create_track_record',
                loadChildren: () => import('./create-update-track-record/create-update-track-record.module').then(m => m.CreateUpdateTrackRecordModule)
            },
            {
                path: 'edit_track_record/:track_record_id',
                loadChildren: () => import('./create-update-track-record/create-update-track-record.module').then(m => m.CreateUpdateTrackRecordModule)
            },
            {
                path: 'memberships',
                loadChildren: () => import('./memberships/memberships.module').then(m => m.MembershipsModule)
            },
            {
                path: 'services',
                loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
            },
            {
                path: 'contact_us_mails',
                loadChildren: () => import('./screen1/screen1.module').then(m => m.Screen1Module)
            },
            {
                path: 'view_mail/:mail_id',
                loadChildren: () => import('./view_mail/view_mail.module').then(m => m.ViewMailModule)
            },
            {
                path: 'track_records',
                loadChildren: () => import('./track-records/track-records.module').then(m => m.TrackRecordsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
