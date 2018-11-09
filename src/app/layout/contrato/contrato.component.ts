import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../../router.animations';

import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';

import { Contrato } from './models/contrato';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {

closeResult: string;

     // It maintains list of contratos
  contratos: Contrato[] = [];
  // It maintains Contrato Model
  regModel: Contrato = new Contrato();
    // It maintains Usuario form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Guardar';
  // It maintains table row index based on selection.
  selectedRow: number;
  

  constructor(private modalService: NgbModal) {
    // Add default Contrato data.
    this.contratos.push(new Contrato('07/07/2018', 'Jesus', 'Maria','Casa Blanca','En proceso'));
    this.contratos.push(new Contrato('02/11/2018', 'Erick', 'Juan','Casa Rosada','Realizado'));
  }

 open(content) {
      console.log("aqui");
        this.modalService.open(content).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
         if (this.submitType === 'Guardar') {
      // Push Contrato model object into Contrato list.
      this.contratos.push(this.regModel);
      console.log(this.submitType);
    } else {
      this.submitType = 'Actualizar';
      // Update the existing properties values based on model.
     
      this.contratos[this.selectedRow].dob = this.regModel.dob;

      this.regModel = Object.assign({}, this.contratos[this.selectedRow]);

      console.log( this.contratos[this.selectedRow]);
      console.log(this.submitType);
    }
    // Hide Contratos entry section.
    this.showNew = false;
        }
        , (reason) => {
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


  ngOnInit() {
  }

 	faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

}
