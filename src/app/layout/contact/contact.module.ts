import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
   // PageHeaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }