import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistroSolicitudRoutingModule } from './registrosolicitud-routing.module';
import { RegistroSolicitudComponent } from './registrosolicitud.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import { TabsModule } from 'ngx-bootstrap/tabs';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import { CalendarModule, DateAdapter } from 'angular-calendar';
registerLocaleData(localeEs);
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
      BsDatepickerModule.forRoot(), // ToastrModule added        
      DatepickerModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(), // ToastrModule added        
      DatepickerModule.forRoot(),
      CommonModule, RegistroSolicitudRoutingModule,
       PageHeaderModule,
       FontAwesomeModule, NgbModule.forRoot(),
       TabsModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [RegistroSolicitudComponent],
    providers: [
    NgbActiveModal,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class RegistroSolicitudModule {

}