import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
	services:any;
	constructor(
		private authService: AuthService
	) { }
	ngOnInit(): void {
		this.authService.retrieve('services').subscribe((res) => {
      	if(res && res['data'] && res['data']){
        	this.services = res['data'];
      	}
  	});
    $("#accordion").on("hide.bs.collapse show.bs.collapse", function (e:any) {
      $(e.target).prev().find("i:last-child").toggleClass("fa-minus fa-plus");
    });
  }
}
