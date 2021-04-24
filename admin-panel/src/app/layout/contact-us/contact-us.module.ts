import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
// MatInputModule, MatCheckboxModule, MatButtonModule,

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
