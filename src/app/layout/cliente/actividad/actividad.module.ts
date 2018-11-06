import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { ActividadRoutingModule } from './actividad-routing.module';
import { ActividadComponent } from './actividad.component';

@NgModule({
  imports: [
    CommonModule,
    ActividadRoutingModule,
      FormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ],
 
  declarations: [ActividadComponent]
})
export class ActividadModule { }
