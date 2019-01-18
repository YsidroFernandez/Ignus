import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './reserva.component';

import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
<<<<<<< HEAD
import { ReservaFilterPipe } from './reserva-filter.pipe';
=======
import { TabsModule } from 'ngx-bootstrap/tabs';
>>>>>>> 13dd6f26e3d3ad34d1feb5a826359b056f9928c8

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    ReservaRoutingModule, NgbModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReservaComponent,ReservaFilterPipe],
  providers:[
  NgbActiveModal,]
})
export class ReservaModule { }