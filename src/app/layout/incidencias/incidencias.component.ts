import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { clientes } from './modelo/clientes';

import { Incidencia } from './modelo/incidencia';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss']
})
export class IncidenciasComponent implements OnInit {

   closeResult: string;
    constructor(private modalService: NgbModal) {}
 
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if(this.selectedIncidencia.id === 0){
        this.selectedIncidencia.id = this.IncidenciaArray.length + 1;
        this.IncidenciaArray.push(this.selectedIncidencia);
        this.msg = 'Campo Agregado Exitosamente';
        }
         this.selectedIncidencia = new Incidencia();
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

    cliente:clientes[];
  cliSelect:Number;

    ngOnInit() {
      this.cliente =[
          {Id:1, Name:"Jesus"},
          {Id:2, Name:"Pedro"},
          {Id:3, Name:"Jhonatan"},
          {Id:4, Name:"Ysidro"}

    ];

    this.cliSelect= 4;

    }

       faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

     msg = '';

      IncidenciaArray:Incidencia[] = [
        {id:1,
	fecha: "28-10-2018",
	motivo: "Tuberias rotas",
	cliente: "Jesus"},
        {id:2,
	fecha: "15-11-2018",
	motivo: "Falla electrica",
	cliente: "Pedro"},
	{id:3,
	fecha: "01-11-2018",
	motivo: "Falta de agua",
	cliente: "Juan"},


    ];

    selectedIncidencia: Incidencia = new Incidencia();

    openForEdit(incidencia: Incidencia) {
      this.selectedIncidencia = incidencia;

}
  delete(i) {
       if(confirm('¿Estas seguro de eliminar este Inmueble?')){
        this.IncidenciaArray.splice(i, 1);
        this.msg = 'Campo Eliminado Exitosamente';
      }
      }
       closeAlert(): void{
      this.msg = '';
      }

}