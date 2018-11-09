import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValoracionRoutingModule } from './valoracion-routing.module';
import { ValoracionComponent } from './valoracion.component';

@NgModule({
  imports: [
    CommonModule,
    ValoracionRoutingModule
  ],
  declarations: [ValoracionComponent]
})
export class ValoracionModule { }
