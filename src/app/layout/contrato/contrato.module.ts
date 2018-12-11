import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlatpickrModule } from "angularx-flatpickr"

import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';

import { PageHeaderModule } from './../../shared';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ContratoRoutingModule,FontAwesomeModule, PageHeaderModule,NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
  ],
  declarations: [ContratoComponent],
    providers: [
    NgbActiveModal,
    ]
})
export class ContratoModule { }
