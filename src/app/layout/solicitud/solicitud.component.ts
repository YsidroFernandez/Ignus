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
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, GlobalsProvider],
    animations: [routerTransition()],


})

export class SolicitudComponent implements OnInit {

    view: CalendarView = CalendarView.Month;  
    CalendarView = CalendarView;
    
    refresh: Subject<any> = new Subject();
    viewDate: Date = new Date();
    locale: string = 'es';
    modalData: any;
    activeDayIsOpen: boolean = true;

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
    public buy: Boolean;
    searchfilter: string;
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

    dayClickeddayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent(event);
        this.refresh.next();
    }

    handleEvent(event: CalendarEvent): void {
        this.modalData = event;
        console.log(this.modalData.title)
        // this.selactores()

        // console.log(inmueble[0])
        this.modalService.open(this.modalContent, { size: 'lg' });
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        body.forEach(day => {
            if (day.date.getDate() % 2 === 1 && day.inMonth) {
                day.cssClass = 'odd-cell';
            }
        });
    }

    clientChanged($event) {
        console.log($event);
    }

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
        this.globalService.getModel("/api/request/pending?status=S&userId="+obj.id.toString()).then((result) => {
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
        console.log('eliminando');
        this.selectedRow = index;
        this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
        this.showNew = true;
        console.log( this.solicitud);
        //Pendiente
        // if (confirm('¿Estas seguro de eliminar este usuario?')) {
        //     this.globalService.updateModel(this.solicitud.id, { message: "no a guta" }, "/api/request/reject")
        //         .then((result) => {
        //             console.log(result);
        //             if (result['status']) {
        //                 this.solicitudes.splice(this.selectedRow, 1);                     
        //             }

        //         }, (err) => {
        //             console.log(err);
        //         });
        // }
        // this.solicitudes.splice(this.selectedRow, 1);
    }

    onCancel() {
        this.showNew = false;
    }

    openForEdit(solicitud) {
        console.log(solicitud.typeService.offeringProperty);
       if (solicitud.typeService.offeringProperty) {
          
        } else { 
        }

    }  

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);

             if (this.submitType === 'Save') {
              
               console.log(this.solicitud.id);
                
                this.globalService.updateModel(this.solicitud.id, {},"/api/request/pending/approve").then((result) => {
                    this.allSolicitud();
                }, (err) => {
                    console.log(err);
                });
            }
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
        console.log(this.solicitudes[i])
        this.globalService.updateModel(
            this.solicitudes[i].id,
            { EmployeeId: this.solicitudes[i].id},
            "/api/request/pending/approve")
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