import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';



@Component({
    selector: 'app-recaudo',
    templateUrl: './recaudo.component.html',
    animations: [routerTransition()],
    styleUrls: ['./recaudo.component.scss']
})
 

export class RecaudoComponent implements OnInit {
    closeResult: string;
    recaudos: any;
    recaudo: any;
    nuevo: any;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.recaudos = [];
        this.recaudo = [];
        this.nuevo = [];

    }


    open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.nuevo = JSON.stringify({name: this.recaudo.name , description:this.recaudo.description});
                this.globalService.addModel(this.nuevo,"/api/requirement")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                        this.globalService.getModel("/api/requirement")
                            .then((result) => {
                                console.log(result);
                                this.recaudos = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
            }else{
                this.globalService.updateModel(this.recaudo.id, this.recaudo, "/api/requirement")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el recaudo
                            this.globalService.getModel("/api/requirement")
                                .then((result) => {
                                    console.log(result);
                                    this.recaudos = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });

            }
            // Hide Usuario entry section.
            this.showNew = false;
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
            return `with: ${reason}`;
        }
    }

    show() {
        console.log("aqui va el loaer");
    }

    ngOnInit() {
        this.show();
        this.globalService.getModel("/api/requirement")
            .then((result) => {
                console.log(result);
                this.recaudos = result['data'];
                console.log(this.recaudos);
            }, (err) => {
                console.log(err);
            });

    }
    faEdit = faEdit;

   
    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.recaudo = Object.assign({}, this.recaudos[this.selectedRow]);
        this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.recaudo = Object.assign({}, this.recaudos[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if(confirm('¿Estas seguro de eliminar este usuario?')){
            this.globalService.removeModel(this.recaudo.id, "/api/requirement")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el recaudo
                            this.globalService.getModel("/api/requirement")
                                .then((result) => {
                                    console.log(result);
                                    this.recaudos = result['data'];
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
        // Hide Usuario entry section.
        this.showNew = false;
    }


}

