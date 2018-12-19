import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';



@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    animations: [routerTransition()],
    styleUrls: ['./collection.component.scss']
})


export class CollectionComponent implements OnInit {
    closeResult: string;
    collections: any;
    collection: any;
    new: any;
    // It maintains collections form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.collections = [];
        this.collection = [];
        this.new = [];

    }


    open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.new = JSON.stringify({name: this.collection.name , description:this.collection.description});
                this.globalService.addModel(this.new,"/api/requirement")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el collection
                        this.globalService.getModel("/api/requirement")
                            .then((result) => {
                                console.log(result);
                                this.collections = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
            }else{
                this.globalService.updateModel(this.collection.id, this.collection, "/api/requirement")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el collection
                            this.globalService.getModel("/api/requirement")
                                .then((result) => {
                                    console.log(result);
                                    this.collections = result['data'];
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
                this.collections = result['data'];
                console.log(this.collections);
            }, (err) => {
                console.log(err);
            });

    }
    faEdit = faEdit;


    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.collection = Object.assign({}, this.collections[this.selectedRow]);
        this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.collection = Object.assign({}, this.collections[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if(confirm('¿Estas seguro de eliminar este usuario?')){
            this.globalService.removeModel(this.collection.id, "/api/requirement")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el collection
                            this.globalService.getModel("/api/requirement")
                                .then((result) => {
                                    console.log(result);
                                    this.collections = result['data'];
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

