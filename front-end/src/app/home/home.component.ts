import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
const { image_path } = environment;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	homeObj: any;
	services: any;
	image_path_server: any = image_path;
	images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  	constructor(
	  	private authService: AuthService,
	  	config: NgbCarouselConfig
	) {
  		config.interval = 5000;
	    config.wrap = false;
	    config.keyboard = false;
	    config.pauseOnHover = false;
	    config.wrap = true;
	}

  	ngOnInit(): void {
	  	this.authService.retrieveBySlug('home', 'home').subscribe((res) => {
	      	if(res && res['data'] && res['data']['_id']){
		        this.homeObj = res['data'];
		        this.homeObj['banner_messages'] = [
		        'We take care your investment Reliably',
		        'Start your profitable trading journey with us'
		        ]
		        // console.log('images: ', this.homeObj.banner_image_path, image_path);
		        // for(let srcs of res['data']['banner_image_path']){
		        //   this.filesrc.push(`${fileLocation}`)
		        // }
	      	}
	    });

	    this.authService.retrieve('services').subscribe((res) => {
	      	if(res && res['data'] && res['data']){
		        this.services = res['data'];
	      	}
	    });
  	}
}
