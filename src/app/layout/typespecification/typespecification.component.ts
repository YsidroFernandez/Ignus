import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../../providers/global.service';



@Component({
    selector: 'app-typespecification',
    templateUrl: './typespecification.component.html',
    styleUrls: ['./typespecification.component.scss'],
    animations: [routerTransition()],
    //providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})


export class TypeSpecificationComponent implements OnInit {
    faEdit = faEdit;
    new: any;
    closeResult: String;
    typeSpecifications: any;
    typeSpecification: any 
    dataModel: any;
    modalTitle: string = 'Tipo de Especificaciones';
    modalIcon: string = 'fa fa-plus'
    modalName: any;
    modalTemplate: any;
    submitType: String = 'Save';
    selectedRow: number;
    disabled: boolean;

    // It maintains typeSpecifications form display status. By default it will be false.
    showNew: Boolean = false;
    
    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.typeSpecifications = [];
        this.typeSpecification = {}
        this.dataModel = [];
        
    }
    public doSelectOptions = (options) => console.log(options);
    
    getListtypeSpecifications(){
        this.globalService.getModel("/api/typeSpecification")
        .then((result) => {
            console.log(result);
            this.typeSpecifications = result['data'];
            console.log(this.typeSpecifications);
        }, (err) => {
            console.log(err);
        });
    }

    apiAction() { //metodo para realizar una accion ya sea crear, editar
        //declaracion que permite enviar el new json ya sea para crear o editar
        this.new = JSON.stringify({ name: this.typeSpecification.name, description: this.typeSpecification.description});
        if (this.submitType === "create") {
            //metodo que perimite enviar por post un new servicio
            this.globalService.addModel(this.new, "/api/typeSpecification")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el service
                        this.getListtypeSpecifications();
                    }
                }, (err) => {
                    console.log(err);
                });
        } else {
            //metodo que perimite enviar por put una actualizaciòn de un servicio
            this.globalService.updateModel(this.typeSpecification.id, this.new, "/api/typeSpecification")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el service
                        this.getListtypeSpecifications();
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
    
        this.getListtypeSpecifications();
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
        
        this.modalName = action;
        this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
        this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
        this.typeSpecification = Object.assign({}, this.typeSpecifications[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico
        console.log(this.typeSpecification)
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
        this.typeSpecification = Object.assign({}, this.typeSpecifications[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar esta typeSpecification?')) {
            this.globalService.removeModel(this.typeSpecification.id, "/api/typeSpecification")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la typeSpecification
                    this.getListtypeSpecifications()
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










