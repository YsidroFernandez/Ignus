import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesCollectionsEmployeeComponent } from './activitiesCollectionsEmployee.component';

const routes: Routes = [
  {
    path: '', component: ActivitiesCollectionsEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesCollectionsEmployeeRoutingModule { }
