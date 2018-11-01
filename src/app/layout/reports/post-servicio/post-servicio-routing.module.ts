import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostServicioComponent } from './post-servicio.component';

const routes: Routes = [
    {
        path: '',
        component: PostServicioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostServicioRoutingModule {}