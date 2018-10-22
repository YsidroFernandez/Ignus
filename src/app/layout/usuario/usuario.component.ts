import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Usuario } from './models/usuario';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
    closeResult: string;
    constructor(private modalService: NgbModal) {}
 
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if(this.selectedUsuario.id === 0){
        this.selectedUsuario.id = this.usuarioArray.length + 1;
        this.usuarioArray.push(this.selectedUsuario);
        }
         this.selectedUsuario = new Usuario();
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    ngOnInit() {}

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

      usuarioArray: Usuario[] = [
        {id: 1, nombre: "Pedro", apellido:"Leal", username:"@pegabriel", rol:"Desarrollador Web"},
        {id: 2, nombre: "Jesus", apellido:"Elias", username:"@jelias", rol:"Desarrollador Web"},
        {id: 3, nombre: "Jonathan", apellido:"Falcon", username:"@jofalcon", rol:"Scrum Master"},
        {id: 4, nombre: "Ysidro", apellido:"Fernandez", username:"@yfernandez", rol:"Desarrollador Senior"}

    ];

    selectedUsuario: Usuario = new Usuario();

    openForEdit(usuario: Usuario){
        this.selectedUsuario = usuario;
    }

    addOrEdit(){
       /* if(this.selectedUsuario.id === 0){
        this.selectedUsuario.id = this.usuarioArray.length + 1;
        this.usuarioArray.push(this.selectedUsuario);
        }
         this.selectedUsuario = new Usuario();*/
    }
    

    delete(){
        if(confirm('¿Estas seguro de eliminar este usuario?')){
        this.usuarioArray = this.usuarioArray.filter(x => x != this.selectedUsuario);
        this.selectedUsuario = new Usuario();
        }
    }
}
