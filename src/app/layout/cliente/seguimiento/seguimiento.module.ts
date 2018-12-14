import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SeguimientoComponent } from './seguimiento.component';
import { PageHeaderModule } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FlatpickrModule } from "angularx-flatpickr"
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    SeguimientoRoutingModule,
    NgbModule.forRoot(),
    FlatpickrModule.forRoot(),
    PageHeaderModule,
    FontAwesomeModule,
    	FormsModule, ReactiveFormsModule
    ],
  declarations: [SeguimientoComponent],
  providers: [NgbActiveModal]
})

export class SeguimientoModule { }