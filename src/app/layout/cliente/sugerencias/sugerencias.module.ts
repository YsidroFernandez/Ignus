import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasComponent } from './sugerencias.component';

@NgModule({
  imports: [
    CommonModule,
    SugerenciasRoutingModule
  ],
  declarations: [SugerenciasComponent]
})
export class SugerenciasModule { }
