import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromedioComponent } from './promedio.component';

const routes: Routes = [
    {
        path: '',
        component: PromedioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromedioRoutingModule {}
