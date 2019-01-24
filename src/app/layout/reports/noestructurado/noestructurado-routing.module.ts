import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoestructuradoComponent } from './noestructurado.component';

const routes: Routes = [
    {
        path: '',
        component: NoestructuradoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoestructuradoRoutingModule {}