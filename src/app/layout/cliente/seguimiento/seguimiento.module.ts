import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SeguimientoComponent } from './seguimiento.component';

@NgModule({
  imports: [
    CommonModule,
    SeguimientoRoutingModule
  ],
  declarations: [SeguimientoComponent]
})
export class SeguimientoModule { }
