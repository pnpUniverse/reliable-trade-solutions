import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    NgbModule,
    AccordionModule
  ]
})
export class ServiceModule { }
