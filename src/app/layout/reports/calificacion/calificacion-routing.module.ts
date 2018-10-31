import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalificacionComponent } from './calificacion.component';

const routes: Routes = [
    {
        path: '',
        component: CalificacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalificacionRoutingModule {}