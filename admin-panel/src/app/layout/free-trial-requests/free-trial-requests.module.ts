import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FreeTrialRequestsRoutingModule } from './free-trial-requests-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FreeTrialRequestsRoutingModule
  ]
})
export class FreeTrialRequestsModule { }
