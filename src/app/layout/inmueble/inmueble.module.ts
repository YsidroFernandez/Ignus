import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { InmuebleRoutingModule } from './inmueble-routing.module';
import { InmuebleComponent } from './inmueble.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InmuebleFilterPipe } from './inmueble-filter.pipe';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule, FontAwesomeModule,
    PageHeaderModule,
    InmuebleRoutingModule,NgbModule.forRoot(), 
    FormsModule, ReactiveFormsModule
  ],
  declarations: [InmuebleComponent,InmuebleFilterPipe],
  providers: [
    NgbActiveModal,
  ]
})
export class InmuebleModule { }
