import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateTrackRecordComponent } from './create-update-track-record.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateTrackRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpdateTrackRecordRoutingModule { }
