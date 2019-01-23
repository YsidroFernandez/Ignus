import { Component, OnInit, Pipe, PipeTransform, Injectable, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../../providers/global.service';
import { ModalDirective } from 'ngx-bootstrap';



@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    animations: [routerTransition()],
    //providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})


export class RoleComponent implements OnInit {
    @ViewChild('childModal') childModal: ModalDirective;
    faEdit = faEdit;
    closeResult: string;
    roles: any;
    rol: any;
    new: any;
    functions: any;
    dataModel: any;
    modalTitle: string = 'Roles';
    modalIcon: string = 'fa fa-plus'
    modalName: any;
    modalTemplate: any;
    submitType: string = 'Save';
    selectedRow: number;
    disabled: boolean;
    searchfilter: string;

    // It maintains roles form display status. By default it will be false.
    showNew: Boolean = false;
    items : any = [];
    ngxValue: any = [];
    ngxDisabled = false;
    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.roles = [];
        this.rol = [];
        this.new = [];
        this.functions = [];
        this.dataModel = [];

  
    }
    public doSelectOptions = (options) => console.log(this.ngxValue, options);
    
    getFunctions() {
        this.globalService.getModel("/api/function/linkable")
        .then((result) => {
            console.log(result);
            this.functions = result['data'];
            console.log(this.functions);
        }, (err) => {
            console.log(err);
        });
    }

    getListRoles(){
        this.globalService.getModel("/api/role")
        .then((result) => {
            console.log(result);
            this.roles = result['data'];
            console.log(this.roles);
        }, (err) => {
            console.log(err);
        });
    }

    apiAction() { //metodo para realizar una accion ya sea crear, editar
        //declaracion que permite enviar el new json ya sea para crear o editar
        this.new = JSON.stringify({ name: this.rol.name, description: this.rol.description, functions: this.ngxValue });
        if (this.submitType === "create") {
            //metodo que perimite enviar por post un new servicio
            this.globalService.addModel(this.new, "/api/role")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el service
                        this.getListRoles();
                    }
                }, (err) => {
                    console.log(err);
                });
        } else {
            //metodo que perimite enviar por put una actualizaciòn de un servicio
            this.globalService.updateModel(this.rol.id, this.new, "/api/role")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el service
                        this.getListRoles();
                    }

                }, (err) => {
                    console.log(err);
                });

        }
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


    ngOnInit() {
        this.getFunctions();
        this.getListRoles();
    }
    
    
    //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear 
    open(content, action, index: number) {
        //==============================================================================
        //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
        //por ejemplo en los botones del modal que  ejecutan la funcion C() cierra el modal y se termina de cumplir la promesa
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //==============================================================================



        this.modalTemplate = content;
        this.ngxValue = [];
        this.modalName = action;
        this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
        this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
        this.rol = Object.assign({}, this.roles[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

        if (index != -1) { //el caso index -1 es cuando se solicita crear, ver html

            for (let i in this.rol.functions) {//ciclo necesario para mostar actividades
                this.ngxValue.push(this.rol.functions[i].id);
            }
            
        }

        if (action == 'show') {//si la accion es ver, desabilita los campos del modal
            this.disabled = true;
            this.modalIcon = "fa fa-close"

        }
        else
            if (action == 'create') {//si la accion es distinta de ver los campos del modal quedaran activados
                this.disabled = false
                this.modalIcon = "fa fa-plus"
            } else
                if (action == 'edit') {//si la accion es distinta de ver los campos del modal quedaran activados
                    this.disabled = false
                    this.modalIcon = "fa fa-edit"
                }

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










