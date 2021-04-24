import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {
	displayedColumns = ['name', 'email', 'subject', 'actions'];
	ELEMENT_DATA: any = [ ];
	tempData:any = [];
	dataSource = new MatTableDataSource(this.ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
  	private authService: AuthService
	) { }
	ngOnInit() {
		this.authService.retrieve('contact_us_mail').subscribe((res) => {
    	if(res && res['data'] && res['data']){
      	this.dataSource.data = res['data'];
      	this.tempData = res['data'];
    	}
   });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
