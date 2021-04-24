import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackRecordComponent } from './track-record.component';

const routes: Routes = [{ path: '', component: TrackRecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRecordRoutingModule { }
