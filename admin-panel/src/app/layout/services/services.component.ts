import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  displayedColumns = ['serviceName', 'serviceDesc', 'actions'];
  ELEMENT_DATA: any = [];
  tempData:any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.retrieve('services').subscribe((res) => {
      if (res['data']) {
        this.dataSource.data = res['data'];
        this.tempData = res['data'];
      }
    });
  }

  deleteService(element_id){
    this.authService.delete('services', element_id).subscribe((res) => {
      if (res['data']) {
        const indx = this.tempData.findIndex(x=> x._id == element_id);
        if(this.tempData[indx]){
          this.tempData.splice(indx, 1);
          this.dataSource.data = this.tempData;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
