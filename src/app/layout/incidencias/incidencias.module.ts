import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IncidenciasComponent } from './incidencias.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageHeaderModule } from './../../shared';
import { IncidenciasFilterPipe } from './incidencias-filter.pipe';

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule, PageHeaderModule,
    IncidenciasRoutingModule, NgbModule.forRoot(),FormsModule, ReactiveFormsModule
  ],
  declarations: [IncidenciasComponent,IncidenciasFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})
export class IncidenciasModule { }
