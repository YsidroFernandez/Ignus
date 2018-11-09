import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';

import { PageHeaderModule } from './../../shared';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ContratoRoutingModule,FontAwesomeModule, PageHeaderModule,NgbModule.forRoot()
  ],
  declarations: [ContratoComponent],
    providers: [
    NgbActiveModal,
    ]
})
export class ContratoModule { }
