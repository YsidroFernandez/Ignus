import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListransactionsRoutingModule } from './listransactions-routing.module';
import { ListransactionsComponent } from './listransactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule, PageHeaderModule,
    ListransactionsRoutingModule, NgbModule.forRoot(), FormsModule, ReactiveFormsModule
  ],
  declarations: [ListransactionsComponent],
  providers: [
    NgbActiveModal,
  ]
})
export class ListransactionsModule { }
