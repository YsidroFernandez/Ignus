import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListIncidencesComponent } from './listincidences.component';

const routes: Routes = [
	 {
        path: '', component: ListIncidencesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListIncidencesRoutingModule { }
