import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../../router.animations';

import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
  animations: [routerTransition()],
    providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ContratoComponent implements OnInit {

    closeResult: string;
    contratos: any;
    contrato: any;
    nuevo: any;
    // It maintains Usuario form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Guardar';
    // It maintains table row index based on selection.
    selectedRow: number;
  

  constructor(private modalService: NgbModal,public globalService: GlobalService) {
    this.contratos = [];
    this.contrato = [];
    this.nuevo = [];

  }

 open(content) {
      console.log("aqui");
        this.modalService.open(content).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
           if (this.submitType === 'Guardar') {
 this.nuevo = JSON.stringify({folioNumber: this.contrato.folioNumber, firmDate: this.contrato.firmDate});
                this.globalService.addModel(this.nuevo,"/api/contract")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el contrato
                        this.globalService.getModel("/api/contract")
                            .then((result) => {
                                console.log(result);
                                this.contratos = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
            }else{
                this.globalService.updateModel(this.contrato.id, this.contrato, "/api/contract")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el contrato
                            this.globalService.getModel("/api/contract")
                                .then((result) => {
                                    console.log(result);
                                    this.contratos = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });

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
         show() {
        console.log("aqui va el loaer");
    }


  ngOnInit() {
  this.show();
        this.globalService.getModel("/api/contract")
            .then((result) => {
                console.log(result);
                this.contratos = result['data'];
                console.log(this.contratos);
            }, (err) => {
                console.log(err);
            });
  }

 	faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.contrato = Object.assign({}, this.contratos[this.selectedRow]);
        this.showNew = true;

}

 // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.contrato = Object.assign({}, this.contratos[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if(confirm('¿Estas seguro de eliminar este contrato?')){
            this.globalService.removeModel(this.contrato.id, "/api/contract")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el contrato
                            this.globalService.getModel("/api/contract")
                                .then((result) => {
                                    console.log(result);
                                    this.contratos = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });
            }


    }


    // This method associate toCancel Button.
    onCancel() {
        // Hide contrato entry section.
        this.showNew = false;
    }


}
