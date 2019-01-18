import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisitaRoutingModule } from './visita-routing.module';
import { VisitaComponent } from './visita.component';
import { PageHeaderModule } from './../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    imports: [CommonModule, VisitaRoutingModule,
       PageHeaderModule,
       NgxPaginationModule,
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [VisitaComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class VisitaModule {

}
