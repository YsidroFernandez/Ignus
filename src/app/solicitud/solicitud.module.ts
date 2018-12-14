import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
import { PageHeaderModule } from './../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [CommonModule, SolicitudRoutingModule,
       PageHeaderModule,
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [SolicitudComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class SolicitudModule {

}
