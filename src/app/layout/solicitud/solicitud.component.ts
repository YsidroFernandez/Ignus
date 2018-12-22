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
    providers: [ GlobalsProvider],
    animations: [routerTransition()]
})
export class SolicitudComponent implements OnInit {

    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public numPage: number;
    public pages = 1;
    closeResult: string;
    solicitudes = [];
    
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;

    solicitud: any = {
        id: '',
        client: {},
        employee: {},
        requestDate: '',
        typeRequest: {},
        typeService: {},
        wishDate: '',
        status:''
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
        this.submitType = 'Actualizar';
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

    // This method associate toCancel Button.
    onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }


    // open(content) {
    //     this.modalService.open(content).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //         if(this.selectedInmueble.id === 0){
    //     this.selectedInmueble.id = this.Inmuebles.length + 1;
    //     this.Inmuebles.push(this.selectedInmueble);
    //     this.msg = 'Campo Agregado Exitosamente';
    //     }
    //      this.selectedInmueble = new Inmueble();
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }

    openForEdit(solicitud) {
        this.solicitud = solicitud;
        console.log(this.solicitud.id );
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            console.log( result );
            this.closeResult = `Closed with: ${result}`;         
            console.log( this.closeResult );


            // if(this.selectedInmueble.id === 0){
            //     this.selectedInmueble.id = this.Inmuebles.length + 1;
            //     this.Inmuebles.push(this.selectedInmueble);
            //     this.msg = 'Campo Agregado Exitosamente';
            //     }
            //      this.selectedInmueble = new Inmueble();
            // if (this.submitType === 'save') {               
            //     this.solicitudes.push(this.solicitud);          
            // } else {
            //     this.submitType = 'update';              
            //     this.solicitudes[this.selectedRow].email = this.solicitud.email;
            //     this.solicitudes[this.selectedRow].type = this.solicitud.type;
            //     this.solicitudes[this.selectedRow].description = this.solicitud.description;
            //     this.solicitudes[this.selectedRow].state = this.solicitud.estate;
            //     this.solicitudes[this.selectedRow].date = this.solicitud.date;
            //     this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);            
            // }         
            // this.showNew = false;
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