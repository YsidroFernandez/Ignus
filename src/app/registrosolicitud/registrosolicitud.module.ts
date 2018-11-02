import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistroSolicitudRoutingModule } from './registrosolicitud-routing.module';
import { RegistroSolicitudComponent } from './registrosolicitud.component';
import { PageHeaderModule } from '../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [CommonModule, RegistroSolicitudRoutingModule,
       PageHeaderModule,
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [RegistroSolicitudComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class RegistroSolicitudModule {

}
