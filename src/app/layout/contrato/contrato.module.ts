import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from "angularx-flatpickr"
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';
import { PageHeaderModule } from './../../shared';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { ContratoFilterPipe } from './contrato-filter.pipe';
defineLocale('es', esLocale);

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    ContratoRoutingModule, FontAwesomeModule, PageHeaderModule, NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [ContratoComponent,ContratoFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})
export class ContratoModule { }
