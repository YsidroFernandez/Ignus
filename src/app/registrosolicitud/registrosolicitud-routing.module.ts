import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroSolicitudComponent } from './registrosolicitud.component';

const routes: Routes = [
    {
        path: '', component: RegistroSolicitudComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistroSolicitudRoutingModule {
}
