import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SeguimientoComponent } from './seguimiento.component';
import { PageHeaderModule } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    SeguimientoRoutingModule,
    PageHeaderModule,
    FontAwesomeModule,
    	FormsModule, ReactiveFormsModule
    ],
  declarations: [SeguimientoComponent],
  providers: []
})

export class SeguimientoModule { }