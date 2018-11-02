import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitaComponent } from './visita.component';
import { RegistrarVisitaComponent } from './registrar/registrar-visita.component';

const routes: Routes = [
    {
        path: '', component: VisitaComponent
    },
    { path: 'add', component: RegistrarVisitaComponent  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitaRoutingModule {
}
