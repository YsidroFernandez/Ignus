import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservaComponent  } from './reserva.component';

const routes: Routes = [
	{
        path: '', component: ReservaComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
