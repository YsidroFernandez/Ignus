import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignPromotionsComponent } from './assignpromotions.component';

const routes: Routes = [
  {
    path: '', component: AssignPromotionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignPromotionsRoutingModule { }
