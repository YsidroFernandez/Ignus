import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { PublicationsRoutingModule } from './publications-routing.module';
import { PublicationsComponent } from './publications.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    PublicationsRoutingModule, NgbModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,PageHeaderModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
      })
    ], 

  declarations: [PublicationsComponent],
    providers: [
    NgbActiveModal,
  ]
})
export class PublicationsModule { }