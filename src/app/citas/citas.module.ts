import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CitasComponent } from './citas.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { CitasRoutingModule } from './citas-routing.module';
import { PageHeaderModule } from './../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [CommonModule,FormsModule, FontAwesomeModule,
    CitasRoutingModule,PageHeaderModule, FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [CitasComponent]
})

export class CitasModule { }
