import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../../environments/environment';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as moment from 'moment';
import { routerTransition } from '../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-solicitud',
    templateUrl: './solicitud.component.html',
    styleUrls: ['./solicitud.component.scss'],
    providers: [GlobalsProvider],
    animations: [routerTransition()]
})
export class SolicitudComponent implements OnInit {

    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public numPage: number;
    public pages = 1;
    closeResult: string;
    solicitudes = [];
    empleados = [];
    nuevo: any;
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    public buy: Boolean = false;
    public sell: Boolean = false;
    solicitud: any = {
        id: '',
        client: {},
        employee: {},
        requestDate: '',
        typeRequest: {},
        typeService: {},
        wishDate: '',
        status: ''
    }

    solicitudAprov: any = {
        title: '',
        description: '',
        date_start: '',
        id_solicitud: '',
        id_employee: ''
    }


    constructor(
        private globals: GlobalsProvider,
        private modalService: NgbModal,
        public globalService: GlobalService) {


        this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });
    }

    ngOnInit() {
        this.numPage = this.globals.numPage;
        this.allSolicitud();
        this.allEmployee();

    }

    clientChanged ($event) {
        console.log($event);
    }

    allEmployee () {
        this.globalService.getModel("/api/employee").then((result) => {
            this.empleados = result['data'];
            console.log(this.empleados);
        }, (err) => {
            console.log(err);
        }); 
    }
    

    allSolicitud() {
        this.globalService.getModel("/api/request/pending").then((result) => {
            this.solicitudes = result['data'];
        }, (err) => {
            console.log(err);
        });
    }

    onEdit(index: number) {
        this.selectedRow = index;
        this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
        console.log(this.solicitud)
        // this.submitType = 'Actualizar';        
        this.showNew = true;
    }

    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar este usuario?')) {
            this.globalService.updateModel(this.solicitud.id, { message: "no a guta" }, "/api/request/reject")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //this.solicitudes.splice(this.selectedRow, 1);                     
                    }

                }, (err) => {
                    console.log(err);
                });
        }
        this.solicitudes.splice(this.selectedRow, 1);
    }

    onCancel() {
        this.showNew = false;
    }

    openForEdit(solicitud) {
        this.solicitud = solicitud;
        console.log(this.solicitud.typeService.name);
        this.solicitudAprov.id_solicitud = this.solicitud.id;
        if(this.solicitud.typeService.name == 'Venta' || this.solicitud.typeService.name == 'Alquiler'){
            this.sell = true;
        }
        if(this.solicitud.typeService.name == 'Compra' || this.solicitud.typeService.name == 'Arrendamiento'){
            this.buy = true;
        }
       
    }

    open(content) {
        // if(this.sell){
            // this.modalService.open(content).result.then((result) => {
            //     this.closeResult = `Closed with: ${result}`;
            //     console.log(this.closeResult);
    
            //     if (this.submitType === 'Save') {
            //         this.nuevo = JSON.stringify({
            //             title: this.solicitudAprov.title,
            //             description: this.solicitudAprov.description,
            //             date_start:  moment(this.solicitudAprov.date_start).format('DD/MM/YYYY'),
            //             SolicitudId: this.solicitudAprov.id_solicitud
            //         });
            //         console.log(this.nuevo);
            //          this.allSolicitud();
                    // this.globalService.addModel(this.nuevo, "/api/").then((result) => {
                 
                    // }, (err) => {
                    //     console.log(err);
                    // });
            //     }
            // }, (reason) => {
            //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            // });
        // }
        if(this.buy== true){
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
                console.log(this.closeResult);
    
                if (this.submitType === 'Save') {
                    this.nuevo = JSON.stringify({
                        title: this.solicitudAprov.title,
                        description: this.solicitudAprov.description,
                        date_start:  moment(this.solicitudAprov.date_start).format('DD/MM/YYYY'),
                        SolicitudId: this.solicitudAprov.id_solicitud
                    });
                    console.log(this.nuevo);
                     this.allSolicitud();
                    // this.globalService.addModel(this.nuevo, "/api/").then((result) => {
                 
                    // }, (err) => {
                    //     console.log(err);
                    // });
                }
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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


    aceptar(i) {
        console.log(this.solicitudes[i - 1])
        this.globalService.updateModel(this.solicitudes[i - 1].id, { EmployeeId: 1, date: "12/12/2018" }, "/api/request/pending/approve")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es eliminado la solicitud
                    console.log(result);
                }
            }, (err) => {
                console.log(err);
            });
        this.solicitudes.splice(i, 1);
        alert("aceptado y validada la cita")
    }


    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;
    faCheck = faCheckCircle;
    faCancel = faTimesCircle;
    msg = '';



}