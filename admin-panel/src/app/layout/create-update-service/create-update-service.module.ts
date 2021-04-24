import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateServiceComponent } from './create-update-service.component';
import { CreateUpdateServiceRoutingModule } from './create-update-service-routing.module';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
// MatInputModule, MatCheckboxModule, MatButtonModule,
    
@NgModule({
  declarations: [CreateUpdateServiceComponent],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    RichTextEditorAllModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CreateUpdateServiceRoutingModule
  ]
})
export class CreateUpdateServiceModule { }
