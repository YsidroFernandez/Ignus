import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';


@Component({
    selector: 'app-service',
    templateUrl: './services.component.html',
    animations: [routerTransition()],
    styleUrls: ['./services.component.scss']
})


export class ServicesComponent implements OnInit {
    //variables publicas
    closeResult: string;
    services: any;
    service: any;
    nuevo: any;
    modalTitle: string = 'Servicio';
    modalIcon: string = 'fa fa-plus'
    modalName: any;
    modalTemplate: any;
    show1: Boolean = false; //variable que permite intercalar ente las vistas de card y tabla
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    disabled: boolean;
    requirements: any;
    activities: any;
    ngxValue: any = [];
    ngxDisabled = false;
    //estas variables son para cargar la opciones en los selectores multiples
    ngxActivities: any = [];
    ngxRequirements: any = [];

    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
        
        this.services = [];
        this.service = [];
        this.nuevo = [];
        this.disabled = true;
    }

    ngOnInit() {//metodo que se ejecuta al inicializar la vista
        //metodos para inicializar la data a mostrar
        this.getServicios();
        this.getActivities();
        this.getRequirements();


    }
    getServicios() { //obtener servicios 
        this.globalService.getModel("/api/typeService")
            .then((result) => {
                console.log(result);
                this.services = result['data'];
                console.log(this.services);
            }, (err) => {
                console.log(err);
            });
    }

    getRequirements() { //obtener requerimientos
        this.globalService.getModel("/api/requirement")
            .then((result) => {
                console.log(result);
                this.requirements = result['data'];
                console.log(this.requirements);
            }, (err) => {
                console.log(err);
            });
    }
    getActivities() { //obtener actividades
        this.globalService.getModel("/api/activity")
            .then((result) => {
                console.log(result);
                this.activities = result['data'];
                console.log(this.activities);
            }, (err) => {
                console.log(err);
            });
    }


    apiAction() { //metodo para realizar una accion ya sea crear, editar


        //declaracion que permite enviar el nuevo json ya sea para crear o editar
        this.nuevo = JSON.stringify({ name: this.service.name, description: this.service.description, requirements: this.ngxRequirements, activities: this.ngxActivities });
        if (this.submitType === "create") {
            //metodo que perimite enviar por post un nuevo servicio
            this.globalService.addModel(this.nuevo, "/api/typeService")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el service
                        this.getServicios();
                    }

                }, (err) => {
                    console.log(err);
                });


        } else {
            //metodo que perimite enviar por put una actualizaciòn de un servicio
            this.globalService.updateModel(this.service.id, this.nuevo, "/api/typeService")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el service
                        this.getServicios();
                    }

                }, (err) => {
                    console.log(err);
                });

        }






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
        this.ngxActivities = [];
        this.ngxRequirements = [];
        this.modalName = action;
        this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
        this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
        this.service = Object.assign({}, this.services[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

        if (index != -1) { //el caso index -1 es cuando se solicita crear, ver html


            for (let i in this.service.activities) {//ciclo necesario para mostar actividades
                this.ngxActivities.push(this.service.activities[i].id);
            }
            for (let i in this.service.requirements) {//ciclo necesario para mostar requerimientos
                this.ngxRequirements.push(this.service.requirements[i].id);
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

    private getDismissReason(reason: any): string { //metodo para establecer razones del cierre de modal
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }





    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.service = Object.assign({}, this.services[this.selectedRow]);
        this.showNew = true;



        this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
            .subscribe(res => {
                if (res) {
                    console.log(res);
                    this.globalService.removeModel(this.service.id, "/api/typeService")
                        .then((result) => {
                            console.log(result);
                            if (result['status']) {
                                //Para que actualice la lista una vez que es eliminado el service
                                this.getServicios();
                            }

                        }, (err) => {
                            console.log(err);
                        });
                } else {
                    console.log('You clicked Cancel. You smart.');
                }
            });



    }


    // This method associate toCancel Button.
    onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }


}

