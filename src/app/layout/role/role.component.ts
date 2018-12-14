import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../../providers/global.service';
//import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    animations: [routerTransition()],
    //providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})


export class RoleComponent implements OnInit {

    closeResult: string;
    roles: any;
    rol: any;
    nuevo: any;
    functions: any;
    dataModel:any;

    // It maintains roles form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;
    constructor(
        private modalService: NgbModal, public globalService: GlobalService) {
        this.roles = [];
        this.rol = [];
        this.nuevo = [];
        this.functions = [];
        this.dataModel = [];

        this.globalService.getModel("/api/function")
            .then((result) => {
                console.log(result);
                this.roles = result['data'];
                this.functions=result['data'];
                console.log(this.roles);
            }, (err) => {
                console.log(err);
            });
           
    }


    open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.nuevo = JSON.stringify({ name: this.rol.name, description: this.rol.description, functions: this.config.value });
                this.globalService.addModel(this.nuevo, "/api/role")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es creado el rol
                            this.globalService.getModel("/api/role")
                                .then((result) => {
                                    console.log(result);
                                    this.roles = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });
            } else {
                this.globalService.updateModel(this.rol.id, this.rol, "/api/role")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el rol
                            this.globalService.getModel("/api/role")
                                .then((result) => {
                                    console.log(result);
                                    this.roles = result['data'];
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
    config = {
        displayKey: "name", //if objects array passed which key to be displayed defaults to description
        search: false, //true/false for the search functionlity defaults to false,
        height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Seleccione las Funciones', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: this.functions,
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input
        multiline: true,
        value: this.dataModel,
    }

   



    ngOnInit() {
        this.show();

        this.globalService.getModel("/api/role")
            .then((result) => {
                console.log(result);
                this.roles = result['data'];
                console.log(this.roles);
            }, (err) => {
                console.log(err);
            });

    }
    faEdit = faEdit;


    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.rol = Object.assign({}, this.roles[this.selectedRow]);
        this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.rol = Object.assign({}, this.roles[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar esta rol?')) {
            this.globalService.removeModel(this.rol.id, "/api/role")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la rol
                        this.globalService.getModel("/api/role")
                            .then((result) => {
                                console.log(result);
                                this.roles = result['data'];
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










