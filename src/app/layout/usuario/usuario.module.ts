import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from './../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule, FontAwesomeModule],
    declarations: [UsuarioComponent]
    
})
export class UsuarioModule {} 
