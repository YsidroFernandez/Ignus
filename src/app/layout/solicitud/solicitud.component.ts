import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../../environments/environment';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';


@Component({
    selector: 'app-solicitud',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './solicitud.component.html',
    styleUrls: ['./solicitud.component.scss'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, GlobalsProvider, NgbModal],
    animations: [routerTransition()],


})

export class SolicitudComponent implements OnInit {

    refresh: Subject<any> = new Subject();
    viewDate: Date = new Date();
    locale: string = 'es';
    modalData: any;
    activeDayIsOpen: boolean = true;

    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public numPage: number;
    public pages = 1;
    view: boolean;
    closeResult: string;
    solicitudes = [];
    empleados = [];
    nuevo: any;
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    public buy: Boolean;
    searchfilter: string;
    public rechazo: any = {
        solicitudId: '',
        description: ''
    }
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
    @ViewChild('modalContent')
    modalContent: TemplateRef<any>;


    // clientChanged($event) {
    //     console.log($event);
    // }

    allEmployee() {
        this.globalService.getModel("/api/employee").then((result) => {
            this.empleados = [];
            this.empleados = result['data'];
            console.log(this.empleados);
        }, (err) => {
            console.log(err);
        });
    }


    allSolicitud() {
        let user = localStorage.getItem("user");
        console.log(user);

        let obj = JSON.parse(user);
        console.log(obj.id)
        this.globalService.getModel("/api/request/?status=S&userId=" + obj.id.toString()).then((result) => {
            this.solicitudes = [];
            console.log(result);
            this.solicitudes = result['data'];
            console.log(this.solicitudes);
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
        console.log();
        this.selectedRow = index;


        this.modalService

    }

    onCancel() {
        this.showNew = false;
    }

    openForEdit(solicitud) {
        if (solicitud.typeService.offeringProperty) {
            this.view = true;
            this.solicitud = solicitud;
            this.rechazo.solicitudId = solicitud.id;
            console.log(this.rechazo);
        } else {
            this.view = false;
            this.solicitud = solicitud;
            this.rechazo.solicitudId = solicitud.id;
            console.log(this.rechazo);
        }
    }

    open(content, action, index: number) {

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.apiAction();

        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.submitType = action;
        this.selectedRow = index;
        this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
 
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


    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;
    faCheck = faCheckCircle;
    faCancel = faTimesCircle;
    msg = '';


    apiAction() {
        var data = JSON.stringify({ description: this.rechazo.description });
        if (this.submitType === "Save") {
            console.log(this.solicitud.id);
            this.globalService.updateModel(this.solicitud.id, {},"/api/request/pending/approve").then((result) => {
                    console.log(result);
                    if (result['status']) {
                        this.allSolicitud();
                    }
                }, (err) => {
                    console.log(err);
                });

        } else if (this.submitType === "delete") {

            this.globalService.updateModel(this.solicitud.id, {},"/api/request/pending/reject").then((result) => {
                    if (result['status']) {
                        this.allSolicitud();
                    }
                }, (err) => {
                    console.log(err);
                });

        }
    }
}