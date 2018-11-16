import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SchedulerComponent } from './scheduler.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { SchedulerRoutingModule } from './scheduler-routing.module';

//traslate general   actualmente utilizado en calendar
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es"

registerLocaleData(localeEs)

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SchedulerRoutingModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [SchedulerComponent]
})

export class SchedulerModule { }
