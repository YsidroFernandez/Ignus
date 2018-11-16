import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { OfrecerRoutingModule } from './ofrecer-routing.module';
import { OfrecerComponent } from './ofrecer.component';


@NgModule({
  imports: [
    CommonModule,
    OfrecerRoutingModule,
    PageHeaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [OfrecerComponent]
})
export class OfrecerModule { }


