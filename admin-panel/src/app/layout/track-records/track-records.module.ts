import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackRecordsRoutingModule } from './track-records-routing.module';
import { TrackRecordsComponent } from './track-records.component';

@NgModule({
  declarations: [TrackRecordsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TrackRecordsRoutingModule
  ]
})
export class TrackRecordsModule { }
