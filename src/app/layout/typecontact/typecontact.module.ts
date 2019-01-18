import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { TypeContactRoutingModule } from './typecontact-routing.module';
import { TypeContactComponent } from './typecontact.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypecontactFilterPipe } from './typecontact-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    TypeContactRoutingModule, NgbModule.forRoot(),
      FormsModule,PageHeaderModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ], 

  declarations: [TypeContactComponent,TypecontactFilterPipe],
    providers: [
    NgbActiveModal,
  ]
})
export class TypeContactModule { }
