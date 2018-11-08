import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecaudoComponent } from './recaudo.component';

const routes: Routes = [
  {
    path: '', component: RecaudoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaudoRoutingModule { }
