import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSelectModule} from 'ngx-select-ex';
import { RoleFilterPipe } from './role-filter.pipe';


@NgModule({
  imports: [
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    RoleRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgxSelectModule,
  ],
  declarations: [RoleComponent,RoleFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})

export class RoleModule { }
