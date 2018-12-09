import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { ActivitiesCollectionsRoutingModule } from './activities-collections-routing.module';
import { ActivitiesCollectionsComponent } from './activities-collections.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesCollectionsRoutingModule, NgbModule.forRoot(),
      FormsModule,PageHeaderModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ],

  declarations: [ActivitiesCollectionsComponent],
    providers: [
    NgbActiveModal,
  ]
})
export class ActivitiesCollectionsModule { }
