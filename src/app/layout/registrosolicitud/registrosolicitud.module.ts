import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistroSolicitudRoutingModule } from './registrosolicitud-routing.module';
import { RegistroSolicitudComponent } from './registrosolicitud.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [
      BsDatepickerModule.forRoot(), // ToastrModule added        
      DatepickerModule.forRoot(),
      CommonModule, RegistroSolicitudRoutingModule,
       PageHeaderModule,
       FontAwesomeModule, NgbModule.forRoot(),
       TabsModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [RegistroSolicitudComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class RegistroSolicitudModule {

}
