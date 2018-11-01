import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticoComponent } from './estadistico.component';

const routes: Routes = [
    {
        path: '',
        component: EstadisticoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstadisticoRoutingModule {}
