import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';
const { image_path } = environment;

@Component({
  selector: 'app-track-record',
  templateUrl: './track-record.component.html',
  styleUrls: ['./track-record.component.scss']
})
export class TrackRecordComponent implements OnInit {

  constructor(
  	private authService: AuthService
  ) { }

  performances: any;

  ngOnInit(): void {
  	this.authService.retrieve('performance').subscribe((res) => {
      if(res && res['data'] && res['data']){
        this.performances = res['data'];
        this.performances.forEach(performance=>{
        	performance['performance_file_path'] = image_path+performance.performance_file_path;
        })
      }
    });
  }

}
