import { NgModule } from '@angular/core';
import { CommonModule,registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardcustomerRoutingModule } from './dashboardcustomer-routing.module';
import { DashboardcustomerComponent } from './dashboardcustomer.component';
import { PageHeaderModule } from '../../../shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardCustomerFilterPipe } from './dashboardcustomer-filter.pipe';
import { StatModule } from '../../../shared';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    DashboardcustomerRoutingModule,
    PageHeaderModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    StatModule,
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [DashboardcustomerComponent,DashboardCustomerFilterPipe],
  providers: []
})
export class DashboardcustomerModule { }
