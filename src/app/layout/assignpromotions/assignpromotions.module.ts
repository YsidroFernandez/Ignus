import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { AssignPromotionsRoutingModule } from './assignpromotions-routing.module';
import { AssignPromotionsComponent } from './assignpromotions.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { SortableModule } from 'ngx-bootstrap/sortable';

@NgModule({
  imports: [
    SortableModule.forRoot(),
    CommonModule,
    DragulaModule.forRoot(),
    AssignPromotionsRoutingModule, NgbModule.forRoot(),
      FormsModule,PageHeaderModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ], 

  declarations: [AssignPromotionsComponent],
    providers: [
    NgbActiveModal,
  ]
})
export class AssignPromotionsModule { }
