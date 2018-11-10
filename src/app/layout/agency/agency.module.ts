import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  
@NgModule({
  imports: [
   
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    AgencyRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule
  ],
  declarations: [AgencyComponent],
  providers: [ 
    NgbActiveModal,
  ]
})
export class AgencyModule { }
