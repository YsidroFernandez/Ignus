import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PageHeaderModule } from '../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ClientFilterPipe } from './client-filter.pipe';

@NgModule({
    imports: [CommonModule, ClientRoutingModule,
       PageHeaderModule,
       Ng4LoadingSpinnerModule.forRoot(),
       FontAwesomeModule, NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [ClientComponent,ClientFilterPipe],
    providers: [
    NgbActiveModal,
  ]

})
export class ClientModule {

}
