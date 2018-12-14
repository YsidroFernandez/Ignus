import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';



@Component({        
    selector: 'app-service',
    templateUrl: './services.component.html',
    animations: [routerTransition()],
    styleUrls: ['./services.component.scss']
})


export class ServicesComponent implements OnInit {
    closeResult: string;
    services: any;
    service: any;
    nuevo: any;
    show1 : Boolean =false;
    // It maintains services form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.services = [];
        this.service = [];
        this.nuevo = [];

    }


    open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.nuevo = JSON.stringify({name: this.service.name , description:this.service.description});
                this.globalService.addModel(this.nuevo,"/api/typeService")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el service
                        this.globalService.getModel("/api/typeService")
                            .then((result) => {
                                console.log(result);
                                this.services = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
            }else{
                this.globalService.updateModel(this.service.id, this.service, "/api/typeService")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el service
                            this.globalService.getModel("/api/typeService")
                                .then((result) => {
                                    console.log(result);
                                    this.services = result['data'];
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
        this.globalService.getModel("/api/typeService")
            .then((result) => {
                console.log(result);
                this.services = result['data'];
                console.log(this.services);
            }, (err) => {
                console.log(err);
            });

    }
    faEdit = faEdit;


    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.service = Object.assign({}, this.services[this.selectedRow]);
        this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.service = Object.assign({}, this.services[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if(confirm('¿Estas seguro de eliminar este usuario?')){
            this.globalService.removeModel(this.service.id, "/api/typeService")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.globalService.getModel("/api/typeService")
                                .then((result) => {
                                    console.log(result);
                                    this.services = result['data'];
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

