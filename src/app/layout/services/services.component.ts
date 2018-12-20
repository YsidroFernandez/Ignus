import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';



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
    show1: Boolean = false;
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    disabled: boolean;
    requirements: any;
    activities: any;
    ngxValue: any = [];
    ngxDisabled = false;

    constructor(private modalService: NgbModal, public globalService: GlobalService) {
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
    public doSelectOptions = (options) => console.log(this.ngxValue, options);

    apiAction() {
        if (this.submitType === "show") {
            //no realizamos ninguna acciòn
            console.log("show es")

        }
        else {
            //declaracion que permite enviar el nuevo json ya sea para crear o editar
            this.nuevo = JSON.stringify({ name: this.service.name, description: this.service.description, requirements: this.service.requirements, activities: this.service.activities });
            if (this.submitType === "create") {
                //metodo que perimite enviar por post un nuevo servicio
                this.globalService.addModel(this.nuevo, "/api/typeService")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es creado el service
                            this.ngOnInit();
                        }

                    }, (err) => {
                        console.log(err);
                    });


            } else {
                //metodo que perimite enviar por put una actualizaciòn de un servicio
                this.globalService.updateModel(this.service.id, this.service, "/api/typeService")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el service
                            this.ngOnInit();
                        }

                    }, (err) => {
                        console.log(err);
                    });

            }
        }

        // cerrar modal
        this.showNew = false;


    }

    open(content, action, index: number) {  //solo para abrir el modal establecieondo una accion determinada sea ver, editar, crear 


        this.modalService.open(content).result.then((result) => { //promesa necesaria para abrir modal
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.modalName = action;
        this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
        this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
        this.service = Object.assign({}, this.services[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico
        console.log(this.service);
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

    private getDismissReason(reason: any): string {
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
        //Pendiente
        if (confirm('¿Estas seguro de eliminar este usuario?')) {
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

