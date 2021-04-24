import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateMembershipComponent } from './create-update-membership.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateMembershipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpdateMembershipRoutingModule { }
