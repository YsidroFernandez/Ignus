import { Component} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import { HttpHeaders } from '@angular/common/http';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss'],
    animations: [routerTransition()],
    providers: [GlobalsProvider]
})
export class ReservaComponent {
    datosUser: any;
    transactions: any;
    tailtransactions: any;
    transaction: any;
    url: string;
    closeResult: string;
    dataModel: any;
    modalTitle: string = 'Reservas Registradas';
    modalIcon: string = 'fa fa-plus'
    modalName: any;
    modalTemplate: any;
    submitType: String = 'Save';
    searchfilter: string;
    selectedRow: number;
    disabled: boolean;
    new: any;
    showNew: any;
    public numbPage: number;
    public numPage: number;
    public listTransacciones: any;
    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;
    faCheck = faCheckCircle;
    faCancel = faTimesCircle;
    reservation: any = {
        transaction: ''
    }

    constructor(
        public globalService: GlobalService,
        private modalService: NgbModal,
        private globals: GlobalsProvider) {
        this.transactions = [];
        this.tailtransactions = [];

        this.getUserData();
        this.getListTransactions();
        this.getTailTransactions()
        this.otro();


    }




    getUserData() {//esto es para obtener el id y buscar sus transacciones asociadas
        let user = localStorage.getItem('user');
        let obj = JSON.parse(user)
        this.globalService.getModel_Id(obj.id.toString(), "/api/user/").then(
            result => {
                this.datosUser = result["data"];
                console.log(this.datosUser);
            },
            err => {
                console.log(err); //this.loader.dismiss();
            });
    }

    getListTransactions() {
        let obj = JSON.parse(localStorage.getItem('user'))
        //this.globalService.getModel("/api/transaction/?status=D&userId"+obj.id).then(
        this.globalService.getModel("/api/transaction/?userId" + obj.id).then(
            (result) => {
                this.transactions = result["data"];
                console.log(this.transactions);
            },
            (err) => {
                console.log(err);
            });
    }

    getTailTransactions() {
        let obj = JSON.parse(localStorage.getItem('user'))
        //this.globalService.getModel("/api/transaction/?status=D&userId"+obj.id).then(
        this.globalService.getModel("/api/transaction/?userId" + obj.id).then(
            (result) => {
                this.tailtransactions = result["data"];
                console.log(this.tailtransactions);
            },
            (err) => {
                console.log(err);
            });
    }

    apiAction() { //metodo para realizar una accion ya sea crear, editar
        //declaracion que permite enviar el new json ya sea para crear o editar
        this.new = JSON.stringify({ });
        if (this.submitType === "create") {
            //metodo que perimite enviar por post un new servicio
            this.globalService.addModel(this.new, "/api/employee/transaction/")
                .then((result) => {
                    console.log(result);
                    console.log(this.new)
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el service
                        this.getListTransactions();
                        this.getTailTransactions();
                    }
                }, (err) => {
                    console.log(err);
                });
        } else {
            //metodo que perimite enviar por put una actualizaciòn de un servicio
            this.globalService.updateModel(this.transaction.id, this.new, "/api/employee/transaction/")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el service
                        this.getListTransactions();
                        this.getTailTransactions();
                    }

                }, (err) => {
                    console.log(err);
                });

        }
    }

    otro() {//esto debería sacar los datos que van para el modal y no lo está haciendo
        this.numPage = this.globals.numPage;
        this.numbPage = this.globals.numPage;
        console.log("num", this.numPage);
        let id = (JSON.parse(localStorage.getItem('user'))).id;//antes de aca, necesito es un selectedTransaction
        this.globalService.getModel('/api/employee/transaction/' + id)
            .then(res => {
                this.listTransacciones = res['data'];
                console.log("Las transacciones:", this.listTransacciones);
            },
                error => {
                    console.log(error);
                })
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear 
    open(content, action, index: number) {
        //==============================================================================
        //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
        //por ejemplo en los botones del modal que  ejecutan la funcion C() cierra el modal y se termina de cumplir la promesa
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            //this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        })
        //==============================================================================


        this.modalTemplate = content;
        this.modalName = action;
        this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
        this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
        this.transaction = Object.assign({}, this.getListTransactions[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

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
    cancelar(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.transaction = Object.assign({}, this.transaction[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar esta reservacion y habilitar de nuevo el inmueble?')) {
            /*    this.globalService.updateModel(this.transaction.id, "/api/employee/transaction/")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado la specification
                            this.getListspecifications()
                        }
        */
        }
    }




    aceptar(index: number) {

        console.log("aceptar")
        this.selectedRow = index;
        this.transaction = Object.assign({}, this.transaction[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar esta reservacion y habilitar de nuevo el inmueble?')) {
            /*    this.globalService.updateModel(this.transaction.id, "/api/employee/transaction/")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado la specification
                            this.getListspecifications()
                        }
        */
        }
    }

    // This method associate toCancel Button.
    onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }
}

