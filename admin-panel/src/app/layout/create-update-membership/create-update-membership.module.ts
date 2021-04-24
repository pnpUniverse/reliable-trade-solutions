import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { MatButtonModule, MatCheckb../oxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUpdateMembershipRoutingModule } from './create-update-membership-routing.module';
import { CreateUpdateMembershipComponent } from './create-update-membership.component';
// MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule,
@NgModule({
  declarations: [CreateUpdateMembershipComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CreateUpdateMembershipRoutingModule
  ]
})
export class CreateUpdateMembershipModule { }
