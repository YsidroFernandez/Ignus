import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { CitasComponent } from './citas.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { CitasRoutingModule } from './citas-routing.module';
import { PageHeaderModule } from '../../shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@NgModule({
  imports: [CommonModule,FormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    CitasRoutingModule,PageHeaderModule, FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [CitasComponent]
})

export class CitasModule { }
