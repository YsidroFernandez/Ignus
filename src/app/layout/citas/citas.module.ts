import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { CitasComponent } from './citas.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { CitasRoutingModule } from './citas-routing.module';
import { PageHeaderModule } from '../../shared';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
defineLocale('es', esLocale);
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    CommonModule,
    FormsModule,    
    FontAwesomeModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    CitasRoutingModule,PageHeaderModule, FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [CitasComponent],
  providers: [NgbActiveModal],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CitasModule { }
    