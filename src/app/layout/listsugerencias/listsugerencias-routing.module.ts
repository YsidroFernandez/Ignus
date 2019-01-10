import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSugerenciasComponent } from './listsugerencias.component';

const routes: Routes = [
	 {
        path: '', component: ListSugerenciasComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSugerenciasRoutingModule { }
