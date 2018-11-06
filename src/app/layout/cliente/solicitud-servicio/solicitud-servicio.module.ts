import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SolicitudServicioRoutingModule } from './solicitud-servicio-routing.module';
import { SolicitudServicioComponent } from './solicitud-servicio.component';
import { PageHeaderModule } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    SolicitudServicioRoutingModule,
    PageHeaderModule,
    FontAwesomeModule, NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [SolicitudServicioComponent],
  providers: [
    NgbActiveModal,
  ]  
})
export class SolicitudServicioModule { }
