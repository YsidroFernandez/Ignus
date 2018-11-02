import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclamoComponent } from './reclamo.component';

const routes: Routes = [
    {
        path: '',
        component: ReclamoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReclamoRoutingModule {}
