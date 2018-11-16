import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReclamosRoutingModule } from './reclamos-routing.module';
import { ReclamosComponent } from './reclamos.component';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';

@NgModule({
  imports: [
    CommonModule,
    ReclamosRoutingModule,
    PageHeaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReclamosComponent]
})
export class ReclamosModule { }

