import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateTrackRecordComponent } from './create-update-track-record.component';
import { CreateUpdateTrackRecordRoutingModule } from './create-update-track-record-routing.module';
// MatInputModule, MatCheckboxModule, MatButtonModule,

@NgModule({
  declarations: [CreateUpdateTrackRecordComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CreateUpdateTrackRecordRoutingModule
  ]
})
export class CreateUpdateTrackRecordModule { }
