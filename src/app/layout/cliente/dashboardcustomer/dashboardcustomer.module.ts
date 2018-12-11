import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardcustomerRoutingModule } from './dashboardcustomer-routing.module';
import { DashboardcustomerComponent } from './dashboardcustomer.component';
import { PageHeaderModule } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    DashboardcustomerRoutingModule,
    PageHeaderModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DashboardcustomerComponent],
  providers: []
})
export class DashboardcustomerModule { }
