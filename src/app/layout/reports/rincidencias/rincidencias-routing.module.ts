import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RincidenciasComponent } from './rincidencias.component';

const routes: Routes = [
    {
        path: '',
        component: RincidenciasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RincidenciasRoutingModule {}