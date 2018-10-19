import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InmueblesComponent } from './inmuebles.component';

const routes: Routes = [
    {
        path: '',
        component: InmueblesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InmueblesRoutingModule {}
