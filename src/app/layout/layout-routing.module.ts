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
            { path: 'reclamo', loadChildren: './reports/reclamo/reclamo.module#ReclamoModule' },
            { path: 'calificacion', loadChildren: './reports/calificacion/calificacion.module#CalificacionModule' },
            { path: 'solicitudes', loadChildren: './reports/solicitudes/solicitudes.module#SolicitudesModule' },
            { path: 'cita', loadChildren: './reports/cita/cita.module#CitaModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'transaction', loadChildren: './transaction/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'incidencias', loadChildren: './incidencias/incidencias.module#IncidenciasModule' },
            { path: 'inmueble', loadChildren: './inmueble/inmueble.module#InmuebleModule' },
            { path: 'cliente', loadChildren: './client/client.module#ClientModule' },
            { path: 'empleados', loadChildren: './employee/employee.module#EmployeeModule' },
            //transacciones
            { path: 'recaudo', loadChildren: './recaudo/recaudo.module#RecaudoModule' },
            { path: 'actividades', loadChildren: './activities/activities.module#ActivitiesModule' },

            { path: 'contrato', loadChildren: './contrato/contrato.module#ContratoModule' },

             { path: 'reserva', loadChildren: './reserva/reserva.module#ReservaModule' },

            { path: 'agency', loadChildren: './agency/agency.module#AgencyModule' },
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            { path: 'visita', loadChildren: './visita/visita.module#VisitaModule' },
            { path: 'citas', loadChildren: './../citas/citas.module#CitasModule' },
            { path: 'scheduler', loadChildren: './../scheduler/scheduler.module#SchedulerModule' },
            { path: 'solicitud', loadChildren: './../solicitud/solicitud.module#SolicitudModule' },
            { path: 'registrosolicitud', loadChildren: './../registrosolicitud/registrosolicitud.module#RegistroSolicitudModule' },

            //cliente
            { path: 'solicitudservicio', loadChildren: './cliente/solicitud-servicio/solicitud-servicio.module#SolicitudServicioModule'},
            { path: 'ofrecer', loadChildren: './cliente/ofrecer/ofrecer.module#OfrecerModule'},
            { path: 'actividad', loadChildren: './cliente/actividad/actividad.module#ActividadModule' },
            { path: 'perfil', loadChildren: './cliente/perfil/perfil.module#PerfilModule' },
            { path: 'sugerencias', loadChildren: './cliente/sugerencias/sugerencias.module#SugerenciasModule'},
            { path: 'reclamos', loadChildren: './cliente/reclamos/reclamos.module#ReclamosModule'},
            { path: 'reclamos', loadChildren: './cliente/reclamos/reclamos.module#ReclamosModule'},
            { path: 'valoracion', loadChildren: './cliente/valoracion/valoracion.module#ValoracionModule'},
            { path: 'seguimiento', loadChildren: './cliente/seguimiento/seguimiento.module#SeguimientoModule'},
            { path: 'dashboardcustomer', loadChildren: './cliente/dashboardcustomer/dashboardcustomer.module#DashboardcustomerModule' },

    ]}
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
