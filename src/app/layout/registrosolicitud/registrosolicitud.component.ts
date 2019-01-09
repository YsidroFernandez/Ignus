import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef } from '@angular/core';
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
import { startOfDay,subMonths,  startOfMonth, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

  
@Component({
    selector: 'app-registrosolicitud',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: [ GlobalsProvider],
    animations: [routerTransition()]

})
export class RegistroSolicitudComponent implements OnInit {
    modalRef: BsModalRef;
    message: string;
    public dispAM = false;
    public dispPM = false;
    
    colors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        }
    };

    minDate: Date = subMonths(new Date(), 1);
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;


    // disableSwitching: boolean;
    // @ViewChild('tabset', { read: ElementRef }) tabsetEl: ElementRef;
    // @ViewChild('tabset') tabset: TabsetComponent;
    // @ViewChild('first') first: TabDirective;
    // @ViewChild('second') second: TabDirective;

    @ViewChild('childModal') childModal: ModalDirective;
  
    view: CalendarView = CalendarView.Month;
    // CalendarView = CalendarView;

    refresh: Subject<any> = new Subject();   
    locale: string = 'es';
    activeDayIsOpen: boolean = true;
    excludeDays: number[] = [0, 6];
    viewDate: Date = new Date();

    events: any = [
        {
            start: startOfDay('2019/01/04'),
            title: 'jajajaaj',
            turno: 'AM',
            color: colors.red
        },
        {
            start: startOfDay('2019/01/04'),
            title: 'test2',
            turno: 'PM',
            color: colors.yellow
        },
        {
            start: startOfDay('2019/01/08'),
            title: 'otros',
            turno: 'AM',
            color: colors.yellow
        }
    ];

    public test: any = {
        fecha: '',
        descripcion: '',
        turno: ''
    }   
    closeResult: string;
    public solicitud: any = {
        ClientId: 1,
        TypeServiceId: '',
        wishDate: '',
        TypeRequestId: 3,
        turn: '',
        type: '',      
        state: '',
        municipality: '',
        parish: '',
        typeProperty: '',
        description: '',
        employee: ''
    };
    public solicitudes: any;
    public nuevo: any;
    public employes = [];
    public states = [];
    public municipalities = [];
    public parishes = [];

    public typeService: any;
    public typeSpecifications: any = [];
    public typeProperties = [];
    public typeProperty: any;

    submitType: string = 'Save';
    selectedRow: number;


    constructor(private modalService: NgbModal,
        public globalService: GlobalService,
        private coolDialogs: NgxCoolDialogsService) {

    }

    ngOnInit() {

        this.globalService.getModel(`/api/state/`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.states = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

        this.globalService.getModel("/api/typeService").then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.typeService = [];
                this.typeService = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

        this.globalService.getModel(`/api/typeProperty`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.typeProperties = [];
                this.typeProperties = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

        this.globalService.getModel(`/api/employee`).then((result) => {
            if (result['status']) {
                console.log(result['data'])
                //Para que actualice la lista una vez que es creado el recaudo
                this.employes = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

        this.globalService.getModel("/api/typeSpecification").then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.typeSpecifications = 0;
                this.typeSpecifications = result['data'];
                console.log(this.typeSpecifications);
            }
        }, (err) => {
            console.log(err);
        });
    }  

    loadSpecifications(type) {
        this.typeSpecifications = [];

        this.globalService.getModel(`/api/typeProperty/specification/${type}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.typeSpecifications = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }
    //this method associate to reload states
    loadmunicipality(state) {
        this.municipalities = [];
        this.parishes = [];

        this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.municipalities = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadparish(municipality) {
        console.log("muni ", municipality)
        this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.parishes = result['data'];

            }
        }, (err) => {
            console.log(err);
        });

    }

    // This method associate to New Button.
    enviar() {
        this.nuevo = [];
        this.nuevo = {
            ClientId: this.solicitud.ClientId,
            TypeServiceId: Number.parseInt(this.solicitud.TypeServiceId),
            wishDate: moment(this.solicitud.wishDate).format('DD/MM/YYYY'),
            TypeRequestId: this.solicitud.TypeRequestId
        };
        console.log("result", this.nuevo);
        this.globalService.addModel(this.nuevo, "/api/request/pending")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el recaudo
                    console.log(result);
                }
            }, (err) => {
                console.log(err);
            });
        // this.solicitud2.tipo = options[select.value-1].text
        //solicitud.push(this.solicitud2)
        alert("Agregado con exito")
        this.limpiar()
    }

    limpiar() {

        this.solicitud = {
            /*  cliente: "1",
              inmueble: {
              tipo: "",
              pisos:"",
              banos: "",
              habitaciones: "",
              descripcion: "",
              direccion: {pais: "",estado:"",municipio:"",parroquia:"",ciudad:"",referencia:""},
              estado: "En espera",
              fotos: []
              },
              fecha: "",
              tipo: "" */
            ClientId: 1,
            TypeServiceId: "",
            wishDate: "",
            TypeRequestId: 3
        }
    }

    // Este metodo escucha el calendario y envia el evento mas la fecha
    dayClicked({ date, events }: { date: Date; events: any[] }): void {
        this.dispAM = false;
        this.dispPM = false;
        this.test.fecha = date;
        if (events.length < 2) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].turno == 'AM') {
                    this.dispAM = true;
                } else
                    if (events[i].turno == 'PM') {
                        this.dispPM = true;
                    }
            }
            this.showChildModal();
        }
    }

    turnoAsignadoAM($event) {
        if ($event.target.checked == true) {
            this.coolDialogs.confirm('Esta seguro que desea reservar este turno?') 
            .subscribe(res => {
                if (res) {
                    this.dispPM = false;
                    this.solicitud.turn = 'AM';
                    this.solicitud.wishDate = moment(this.test.fecha).format('DD/MM/YYYY');
                    this.events.push({
                        start: startOfDay(this.test.fecha),
                        title: 'jajajaaj',
                        turno: 'AM',
                        color: colors.red,
                        resizable: {
                            beforeStart: true,
                            afterEnd: true
                        }
                    });           
                    this.hideChildModal();
                    this.refresh.next();
                } else {
                    this.dispPM = false; 
                    $event.target.checked = false;
                    this.hideChildModal();
                    this.refresh.next();
                }
            });
        } else
            if ($event.target.checked == false) {
                this.dispPM = true;              
                this.hideChildModal();
            }
        console.log(this.solicitud);
    }

    turnoAsignadoPM($event) {
        if ($event.target.checked == true) {
            this.coolDialogs.confirm('Esta seguro que desea reservar este turno?') 
                .subscribe(res => {
                    if (res) {
                        this.dispAM = true;
                        this.solicitud.turn = 'PM';
                        this.solicitud.wishDate = moment(this.test.fecha).format('DD/MM/YYYY');
                        this.events.push({
                            start: startOfDay(this.test.fecha),
                            title: 'jajajaaj',
                            turno: 'PM',
                            color: colors.red,
                            resizable: {
                                beforeStart: true,
                                afterEnd: true
                            }
                        });                      
                        this.hideChildModal();
                        this.refresh.next();
                    } else {
                        this.dispAM = false; 
                        $event.target.checked = false;
                        this.hideChildModal();
                        this.refresh.next();
                    }
                });
        } else
            if ($event.target.checked == false) {
                this.dispAM = false;

            }
    }

    showChildModal(): void {
        this.childModal.show();
    }
    hideChildModal(): void {
        this.childModal.hide();
    }
}