import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
// MatInputModule, MatCheckboxModule, MatButtonModule,

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
