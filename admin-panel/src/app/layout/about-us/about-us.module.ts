import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
// MatInputModule, MatCheckboxModule, MatButtonModule,

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    RichTextEditorAllModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AboutUsModule { }
