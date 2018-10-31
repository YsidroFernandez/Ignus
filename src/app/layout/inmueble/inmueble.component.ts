import { Component, OnInit } from '@angular/core';


import { Inmueble } from './modelo/inmueble';

import { tipos } from './modelo/tipos';

import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.scss']
})
export class InmuebleComponent implements OnInit {
 closeResult: string;
    constructor(private modalService: NgbModal) {}
 
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if(this.selectedInmueble.id === 0){
        this.selectedInmueble.id = this.Inmuebles.length + 1;
        this.Inmuebles.push(this.selectedInmueble);
        this.msg = 'Campo Agregado Exitosamente';
        }
         this.selectedInmueble = new Inmueble();
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

  tipo:tipos[];
  tipSelect:Number;

  ngOnInit() {
    this.tipo =[
          {Id:1, Name:"Casa"},
          {Id:2, Name:"Edificio"},
          {Id:3, Name:"Terreno"},
          {Id:4, Name:"Parcela"}

    ];

this.tipSelect= 4;

  }

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

    msg = '';

    Inmuebles:Inmueble[] = [
    { id:1, tipo:"casa", nombre:"blanca", descripcion:"tiene 3 cuartos, 2 baños,cocina  empotrada... ",ubicacion:"caracas",precio:1000},
    { id:2, tipo:"Edificio", nombre:'gemelo', descripcion:"tiene 30 pisos, 15 habitaciones,2 acensores...",ubicacion:"barquisimeto",precio:2000},
    { id:3, tipo:"terreno", nombre:"rocafelex", descripcion:"tiene 900 mts2... ",ubicacion:"zulia",precio:3000},
    ];

    selectedInmueble: Inmueble = new Inmueble();

    openForEdit(inmueble: Inmueble) {
      this.selectedInmueble = inmueble;
    }




    addOrEdit() {

      /*if(this.selectedInmueble.id === 0){

      this.selectedInmueble.id = this.Inmuebles.length + 1;
      this.Inmuebles.push(this.selectedInmueble);
        this.msg = 'Campo Agregado Exitosamente';

      }

      this.selectedInmueble = new Inmueble();*/

      }

       delete(i) {
       if(confirm('¿Estas seguro de eliminar este Inmueble?')){
        this.Inmuebles.splice(i, 1);
        this.msg = 'Campo Eliminado Exitosamente';
      }
      }
      closeAlert(): void{
      this.msg = '';
      }
}

