import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { ValoracionRoutingModule } from './valoracion-routing.module';
import { ValoracionComponent } from './valoracion.component';

@NgModule({
  imports: [
    CommonModule,
    ValoracionRoutingModule,
    PageHeaderModule,
    TooltipModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ValoracionComponent]
})
export class ValoracionModule { }

