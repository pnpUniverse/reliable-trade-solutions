import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
	services:any;
	constructor(
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.authService.retrieve('services').subscribe((res) => {
      	if(res && res['data'] && res['data']){
        	this.services = res['data'];
        	console.log('this.services: ', this.services);
          this.services['show_hide'] = false;
      	}
  	});
	}

  handleShowHide(_id, status_update){
    for(let service of this.services){
      if(service._id == _id) {
        service = status_update;
      } else {
        service.show_hide = false;
      }
    }
  }
}
