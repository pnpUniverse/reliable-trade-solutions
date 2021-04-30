import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackRecordsComponent } from './track-records.component';

const routes: Routes = [
	{
	    path: '',
	    component: TrackRecordsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRecordsRoutingModule { }
