import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { RecaudoRoutingModule } from './recaudo-routing.module';
import { RecaudoComponent } from './recaudo.component';

@NgModule({
  imports: [
    CommonModule,
    RecaudoRoutingModule,
      FormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ],

  declarations: [RecaudoComponent]
})
export class RecaudoModule { }
