import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardcustomerRoutingModule } from './dashboardcustomer-routing.module';
import { DashboardcustomerComponent } from './dashboardcustomer.component';
import { PageHeaderModule } from '../../../shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    DashboardcustomerRoutingModule,
    PageHeaderModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DashboardcustomerComponent],
  providers: []
})
export class DashboardcustomerModule { }
