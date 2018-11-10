import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudServicioComponent} from './solicitud-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudServicioRoutingModule { }
