import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitaComponent } from './visita.component';

const routes: Routes = [
    {
        path: '', component: VisitaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitaRoutingModule {
}
