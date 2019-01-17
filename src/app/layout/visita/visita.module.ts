import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VisitaRoutingModule } from './visita-routing.module';
import { VisitaComponent } from './visita.component';
import { PageHeaderModule } from './../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrarVisitaComponent } from './registrar/registrar-visita.component';
import { VisitaFilterPipe } from './visita-filter.pipe';


@NgModule({
    imports: [CommonModule, VisitaRoutingModule,
       PageHeaderModule,
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [VisitaComponent, RegistrarVisitaComponent,VisitaFilterPipe],
    providers: [
    NgbActiveModal,
  ]

})
export class VisitaModule {

}
