import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesCollectionsComponent } from './activities-collections.component';

const routes: Routes = [
  {
    path: '', component: ActivitiesCollectionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesCollectionsRoutingModule { }
