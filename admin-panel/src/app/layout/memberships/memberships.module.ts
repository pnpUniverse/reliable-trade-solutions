import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipsComponent } from './memberships.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { MembershipsRoutingModule } from './memberships-routing.module';
// MatToolbarModule, MatInputModule,  MatTableModule, MatPaginatorModule,

@NgModule({
  declarations: [ MembershipsComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    MembershipsRoutingModule
  ]
})
export class MembershipsModule { }
