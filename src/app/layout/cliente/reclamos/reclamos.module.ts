import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamosRoutingModule } from './reclamos-routing.module';
import { ReclamosComponent } from './reclamos.component';

@NgModule({
  imports: [
    CommonModule,
    ReclamosRoutingModule
  ],
  declarations: [ReclamosComponent]
})
export class ReclamosModule { }
