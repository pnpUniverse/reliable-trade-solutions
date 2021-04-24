import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
  	private authService: AuthService
  ) { }

  about_us: any;

  ngOnInit(): void {
  	this.authService.retrieveBySlug('about_us', 'about_us').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this.about_us = res['data'];
      }
    });
  }

}
