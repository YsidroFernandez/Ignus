import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';

import { SpecificationRoutingModule } from './specification-routing.module';
import { SpecificationComponent } from './specification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSelectModule} from 'ngx-select-ex';
import { SpecificationFilterPipe } from './specification-filter.pipe';


@NgModule({
  imports: [
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    SpecificationRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgxSelectModule,
  ],
  declarations: [SpecificationComponent,SpecificationFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})

export class SpecificationModule { }
