import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MaterialModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false }),
        FormsModule,
    	ReactiveFormsModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
