import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
