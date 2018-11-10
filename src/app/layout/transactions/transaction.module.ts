import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { TransactionRoutingModule } from './transaction-rounting.module';
import { TransactionsComponent } from './transactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  
@NgModule({
  imports: [
   
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    TransactionRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule
  ],
  declarations: [TransactionsComponent],
  providers: [ 
    NgbActiveModal,
  ]
})
export class TransactionsModule { }
