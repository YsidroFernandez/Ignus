import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListIncidencesRoutingModule } from './listincidences-routing.module';
import { ListIncidencesComponent } from './listincidences.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageHeaderModule } from './../../shared';
import { LisincidencesFilterPipe } from './listincidences-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, FontAwesomeModule, PageHeaderModule,
    ListIncidencesRoutingModule, NgbModule.forRoot(),FormsModule, ReactiveFormsModule
  ],
  declarations: [ListIncidencesComponent,LisincidencesFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})
export class ListIncidencesModule { }
