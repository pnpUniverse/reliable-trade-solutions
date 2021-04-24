import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRecordRoutingModule } from './track-record-routing.module';
import { TrackRecordComponent } from './track-record.component';


@NgModule({
  declarations: [TrackRecordComponent],
  imports: [
    CommonModule,
    TrackRecordRoutingModule
  ]
})
export class TrackRecordModule { }
