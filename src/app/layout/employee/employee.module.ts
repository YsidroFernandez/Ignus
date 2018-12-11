import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
    imports: [CommonModule, EmployeeRoutingModule,
       PageHeaderModule,
       Ng4LoadingSpinnerModule.forRoot(),
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [EmployeeComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class EmployeeModule {

}
