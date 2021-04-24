import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
// MatToolbarModule, MatInputModule,  MatTableModule, MatPaginatorModule,

@NgModule({
  declarations: [ ServicesComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
