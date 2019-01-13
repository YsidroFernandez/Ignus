import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListransactionsComponent } from './listransactions.component';

const routes: Routes = [
	 {
        path: '', component: ListransactionsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListransactionsRoutingModule { }
