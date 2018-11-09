import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfrecerComponent } from './ofrecer.component';

const routes: Routes = [
{ path: '', component: OfrecerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfrecerRoutingModule { }
