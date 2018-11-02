import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';

const routes: Routes = [
    {
        path: '',
        component: SolicitudesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudesRoutingModule {}