import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecificationComponent } from './specification.component';

const routes: Routes = [
    {
        path: '', component: SpecificationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecificationRoutingModule {
}
