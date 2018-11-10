import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfrecerRoutingModule } from './ofrecer-routing.module';
import { OfrecerComponent } from './ofrecer.component';

@NgModule({
  imports: [
    CommonModule,
    OfrecerRoutingModule
  ],
  declarations: [OfrecerComponent]
})
export class OfrecerModule { }
