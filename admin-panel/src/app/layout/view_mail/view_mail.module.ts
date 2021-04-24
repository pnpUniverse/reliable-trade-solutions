import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMailComponent } from './view_mail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ViewMailRoutingModule } from './view_mail-routing.module';

@NgModule({
  declarations: [ViewMailComponent],
  imports: [
    CommonModule,
    ViewMailRoutingModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class ViewMailModule { }
