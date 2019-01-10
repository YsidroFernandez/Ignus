import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './reserva.component';

import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    ReservaRoutingModule, NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReservaComponent],
  providers:[
  NgbActiveModal,]
})
export class ReservaModule { }