import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransaccionesComponent } from './transacciones.component';

const routes: Routes = [
    {
        path: '',
        component: TransaccionesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class transaccionesRoutingModule {}
