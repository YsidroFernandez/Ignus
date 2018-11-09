import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SugerenciasComponent } from './sugerencias.component';

const routes: Routes = [
{ path: '', component: SugerenciasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SugerenciasRoutingModule { }
