import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './reserva.component';

import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    ReservaRoutingModule,PageHeaderModule
  ],
  declarations: [ReservaComponent]
})
export class ReservaModule { }
