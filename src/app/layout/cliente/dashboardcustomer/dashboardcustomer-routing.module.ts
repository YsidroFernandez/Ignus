import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardcustomerComponent} from './dashboardcustomer.component';

const routes: Routes = [
  {
    path: '', component: DashboardcustomerComponent
  }
]; 


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardcustomerRoutingModule { }
