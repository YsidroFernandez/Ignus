import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, SolicitudRoutingModule,
    PageHeaderModule,
    BsDatepickerModule.forRoot(), // ToastrModule added        
    DatepickerModule.forRoot(),
    FontAwesomeModule, NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule],
  declarations: [SolicitudComponent],
  providers: [
    NgbActiveModal,
  ]

})
export class SolicitudModule {

}
