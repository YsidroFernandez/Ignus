import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {   path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'estadistico', loadChildren: './reports/estadistico/estadistico.module#EstadisticoModule' },
            { path: 'promedio', loadChildren: './reports/promedio/promedio.module#PromedioModule' },
            { path: 'post-servicio', loadChildren: './reports/post-servicio/post-servicio.module#PostServicioModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'transaction', loadChildren: './transaction/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'incidencias', loadChildren: './incidencias/incidencias.module#IncidenciasModule' },
            { path: 'inmueble', loadChildren: './inmueble/inmueble.module#InmuebleModule' },
            { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' },
            { path: 'agency', loadChildren: './agency/agency.module#AgencyModule' },
            { path: 'citas', loadChildren: './../citas/citas.module#CitasModule' },
            { path: 'scheduler', loadChildren: './../scheduler/scheduler.module#SchedulerModule' },
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
