import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from './../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule, FontAwesomeModule, NgbModule.forRoot(), FormsModule, ReactiveFormsModule],
    declarations: [UsuarioComponent],
    providers: [
    NgbActiveModal,
  ]

})
export class UsuarioModule {

}
