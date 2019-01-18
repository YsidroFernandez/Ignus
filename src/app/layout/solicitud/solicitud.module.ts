import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
// import localeFr from '@angular/common/locales/fr';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { SolicitudFilterPipe } from './solicitud-filter.pipe';
registerLocaleData(localeEs);
@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, SolicitudRoutingModule,
    PageHeaderModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    FontAwesomeModule, NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule],
  declarations: [SolicitudComponent,SolicitudFilterPipe],
  providers: [
    NgbActiveModal,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SolicitudModule {

}
