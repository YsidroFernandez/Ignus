import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListSugerenciasRoutingModule } from './listsugerencias-routing.module';
import { ListSugerenciasComponent } from './listsugerencias.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule, PageHeaderModule,
    ListSugerenciasRoutingModule, NgbModule.forRoot(),FormsModule, ReactiveFormsModule
  ],
  declarations: [ListSugerenciasComponent],
  providers: [
    NgbActiveModal,
  ]
})
export class ListSugerenciasModule { }
