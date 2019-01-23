import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {   path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'estadistico', loadChildren: './reports/estadistico/estadistico.module#EstadisticoModule' },
            { path: 'promedio', loadChildren: './reports/promedio/promedio.module#PromedioModule' },
            { path: 'post-servicio', loadChildren: './reports/post-servicio/post-servicio.module#PostServicioModule' },
            { path: 'reclamo', loadChildren: './reports/reclamo/reclamo.module#ReclamoModule' },
            { path: 'calificacion', loadChildren: './reports/calificacion/calificacion.module#CalificacionModule' },
            { path: 'solicitudes', loadChildren: './reports/solicitudes/solicitudes.module#SolicitudesModule' },
            { path: 'cita', loadChildren: './reports/cita/cita.module#CitaModule' },
            { path: 'servicio', loadChildren: './reports/servicio/servicio.module#ServicioModule' },
            { path: 'incidencias', loadChildren: './incidencias/incidencias.module#IncidenciasModule' },
            { path: 'inmueble', loadChildren: './inmueble/inmueble.module#InmuebleModule' },
            { path: 'cliente', loadChildren: './customers/client.module#ClientModule' },
            { path: 'empleados', loadChildren: './employee/employee.module#EmployeeModule' },
            { path: 'socialnetworks', loadChildren: './socialnetworks/socialnetworks.module#SocialNetworksModule' },
            { path: 'promociones', loadChildren: './promotions/promotions.module#PromotionsModule' },
            { path: 'asignarpromociones', loadChildren: './assignpromotions/assignpromotions.module#AssignPromotionsModule' },
            { path: 'atencionclientes', loadChildren: './listsugerencias/listsugerencias.module#ListSugerenciasModule' },
            { path: 'atencionincidencias', loadChildren: './listincidences/listincidences.module#ListIncidencesModule' },
            { path: 'tipoespecificacion', loadChildren: './typespecification/typespecification.module#TypeSpecificationModule' },
            { path: 'especificacion', loadChildren: './specification/specification.module#SpecificationModule' },
            { path: 'reporteincidencia', loadChildren: './reports/rincidencias/rincidencias.module#RincidenciasModule' },
            //transacciones
            { path: 'recaudo', loadChildren: './collection/collection.module#CollectionModule' },
            { path: 'actividades', loadChildren: './activities/activities.module#ActivitiesModule' },
            { path: 'activitiesCollections', loadChildren: './activitiesCollections/activitiesCollections.module#ActivitiesCollectionsModule' },
            { path: 'activitiesEmployee', loadChildren: './activitiesCollectionsEmployee/activitiesCollectionsEmployee.module#ActivitiesCollectionsEmployeeModule' },
            { path: 'publicacion', loadChildren: './publications/publications.module#PublicationsModule' },
            //{ path: 'activitiesEmployee/:id', loadChildren: './activitiesCollectionsEmployee/activitiesCollectionsEmployee.module#ActivitiesCollectionsEmployeeModule' },
            { path: 'services', loadChildren: './services/services.module#ServicesModule' },
            { path: 'contrato', loadChildren: './contrato/contrato.module#ContratoModule' },
            { path: 'reserva', loadChildren: './reserva/reserva.module#ReservaModule' },
            { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
            { path: 'tipocontacto', loadChildren: './typecontact/typecontact.module#TypeContactModule' },
            { path: 'agency', loadChildren: './agency/agency.module#AgencyModule' },
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            { path: 'visita', loadChildren: './visita/visita.module#VisitaModule' },
            { path: 'citas', loadChildren: './citas/citas.module#CitasModule' },
            { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule' },
            { path: 'listransactions', loadChildren: './listransactions/listransactions.module#ListransactionsModule',pathMatch: 'full'},
            { path: 'solicitud', loadChildren: './solicitud/solicitud.module#SolicitudModule' },
            { path: 'registrosolicitud', loadChildren: './registrosolicitud/registrosolicitud.module#RegistroSolicitudModule' },
            // cliente
            { path: 'solicitudservicio', loadChildren: './cliente/solicitud-servicio/solicitud-servicio.module#SolicitudServicioModule'},
            { path: 'ofrecer', loadChildren: './cliente/ofrecer/ofrecer.module#OfrecerModule'},
            { path: 'actividad', loadChildren: './cliente/actividad/actividad.module#ActividadModule' },
            { path: 'perfil', loadChildren: './cliente/perfil/perfil.module#PerfilModule' },
            { path: 'sugerencias', loadChildren: './cliente/sugerencias/sugerencias.module#SugerenciasModule'},
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
