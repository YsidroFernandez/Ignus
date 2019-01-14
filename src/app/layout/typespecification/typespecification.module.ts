import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { TypeSpecificationRoutingModule } from './typespecification-routing.module';
import { TypeSpecificationComponent } from './typespecification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSelectModule} from 'ngx-select-ex';


@NgModule({
  imports: [
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    TypeSpecificationRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgxSelectModule,
  ],
  declarations: [TypeSpecificationComponent],
  providers: [
    NgbActiveModal,
  ]
})

export class TypeSpecificationModule { }
