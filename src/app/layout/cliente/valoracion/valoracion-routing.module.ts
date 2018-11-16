import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValoracionComponent } from './valoracion.component';

const routes: Routes = [
{ path: '', component: ValoracionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValoracionRoutingModule { }
