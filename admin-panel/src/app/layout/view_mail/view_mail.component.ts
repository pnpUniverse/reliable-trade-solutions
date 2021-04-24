import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view_mail',
  templateUrl: './view_mail.component.html',
  styleUrls: ['./view_mail.component.scss']
})
export class ViewMailComponent implements OnInit {
	constructor(
  	private authService: AuthService,
    private _activatedRoute: ActivatedRoute
	) { }
  mailObj: any;
	ngOnInit() {
    if(this._activatedRoute.snapshot.params && this._activatedRoute.snapshot.params.mail_id) {
      this.authService.retrieveById('contact_us_mail', this._activatedRoute.snapshot.params.mail_id).subscribe((res) => {
        if(res && res['data'] && res['data']['_id']){
          this.mailObj = res['data'];
        }
      });
    }
	}
}
