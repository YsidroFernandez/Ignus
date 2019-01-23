import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import * as moment from 'moment';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [routerTransition()]
})
export class ContactComponent implements OnInit {

    closeResult: string;
    contacts: any;
    nuevo: any;
    new: any;
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    searchfilter: string;
    typeContact: any = [];
    descripcion: any;
    subjectArray: any = [];
    TypeContactId: 0;
    SubjectId: 0;
    public contact: any = {
        id: '',
        name: '',
        typeContactId: '',
        subjectId: '',
        description: ''
    };
    constructor(
        private modalService: NgbModal, public globalService: GlobalService) {

        let now = moment().format();
        this.new = [];
        this.typeContact = [];
        this.subjectArray = [];


        this.globalService.getModel("/api/typeContact").then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el contacto
                this.typeContact = result['data'];
                console.log(this.typeContact);

            }
        }, (err) => {
            console.log(err);
        });

        this.globalService.getModel("/api/subject").then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el tema
                this.subjectArray = result['data'];
                console.log(this.subjectArray);
            }
        }, (err) => {
            console.log(err);
        });

        console.log("hola")
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.new = JSON.stringify({
                    name: this.contact.name,
                    TypeContactId: Number.parseInt(this.contact.typeContactId),
                    SubjectId: Number.parseInt(this.contact.subjectId),
                    description: this.contact.description
                });
                this.globalService.addModel(this.new, "/api/contact")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es creado el promotion
                            this.globalService.getModel("/api/contact")
                                .then((result) => {

                                    this.contacts = result['data'];

                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });
            } else {
                this.globalService.updateModel(this.contact.id, this.contact, "/api/contact")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el promotion
                            this.globalService.getModel("/api/contact")
                                .then((result) => {
                                    console.log(result);
                                    this.contacts = result['data'];
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
        console.log("aqui va el loader");
    }

    ngOnInit() {

        this.show();
        this.allContact();
    }

    allContact() {

        this.globalService.getModel("/api/contact")
            .then((result) => {

                this.contacts = result['data'];
                console.log(this.contacts);
            }, (err) => {
                console.log(err);
            });
    }

    // onEdit(index: number) {
    //     this.submitType = 'Update';
    //     this.selectedRow = index;
    //     this.contact = Object.assign({}, this.contacts[this.selectedRow]);
    //     console.log(this.contact);
    //     this.showNew = true;
    // }

    openForEdit(item) {
        this.contact = item;       
            console.log(this.contact);
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.contact = Object.assign({}, this.contacts[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar?')) {
            this.globalService.removeModel(this.contact.id, "/api/contact")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado 
                        this.globalService.getModel("/api/contact")
                            .then((result) => {
                                console.log(result);
                                this.contacts = result['data'];
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
