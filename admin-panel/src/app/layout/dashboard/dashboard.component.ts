import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    counts: any = {}

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.countByModelName('contact_us_mail').subscribe((res) => {
            this.counts['contact_us_mail'] = 0;
            if(res && res['data'] && res['data']){
                this.counts['contact_us_mail'] = res['data'];
            }
        });

        this.authService.countByModelName('services').subscribe((res) => {
            this.counts['services'] = 0;
            if(res && res['data'] && res['data']){
                this.counts['services'] = res['data'];
            }
        });

        this.authService.countByModelName('memberships').subscribe((res) => {
            this.counts['memberships'] = 0;
            if(res && res['data'] && res['data']){
                this.counts['memberships'] = res['data'];
            }
        });
    }
}
