import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeContactComponent } from './typecontact.component';

const routes: Routes = [
  {
    path: '', component: TypeContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeContactRoutingModule { }
