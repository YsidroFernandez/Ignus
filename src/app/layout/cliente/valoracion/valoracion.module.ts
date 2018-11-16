import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { ValoracionRoutingModule } from './valoracion-routing.module';
import { ValoracionComponent } from './valoracion.component';

@NgModule({
  imports: [
    CommonModule,
    ValoracionRoutingModule,
    PageHeaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ValoracionComponent]
})
export class ValoracionModule { }

