import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialnetworksComponent } from './socialnetworks.component';

const routes: Routes = [
  {
    path: '', component: SocialnetworksComponent
  }
];     

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialNetworksRoutingModule { }
