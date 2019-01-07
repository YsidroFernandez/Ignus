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
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
    selector: 'app-registrosolicitud',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, GlobalsProvider],
    animations: [routerTransition()]
   
})
export class RegistroSolicitudComponent implements OnInit {
    modalRef: BsModalRef;
    message: string;

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

    disableSwitching: boolean;
    @ViewChild('tabset', {read: ElementRef}) tabsetEl: ElementRef;
    @ViewChild('tabset') tabset: TabsetComponent;
    @ViewChild('first') first: TabDirective;
    @ViewChild('second') second: TabDirective;

    view: CalendarView = CalendarView.Month;  
    CalendarView = CalendarView;
    refresh: Subject<any> = new Subject();
    viewDate: Date = new Date();
    locale: string = 'es';
    modalData: any;
    activeDayIsOpen: boolean = true;

    clickedDate: Date;

    actions: CalendarEventAction[] = [
        {
          label: '<i class="fa fa-fw fa-pencil"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
          }
        },
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
          }
        }
      ];

    events: CalendarEvent[] = [
        {
          start: startOfDay('2019/01/04'),    
          title: 'jajajaaj',
          color: colors.red,
          actions: this.actions,      
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        },
        {
          start: startOfDay('2019/01/04'),
          title: 'test2',
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        },
        {
         start: startOfDay('2019/01/08'),
          title: 'otros',
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        }
      ];

      public test: any = {
          fecha: '',
          descripcion: '',
          turno: ''
      }

    datePickerConfig: Partial<BsDatepickerConfig>;
    closeResult: string;
    solicitud: any;
    solicitudes: any;
    nuevo: any;
    employes = [];
    states = [];
    municipalities = [];
    parishes = [];


    typeService: any;
    typeSpecifications: any = [];
    especificaciones: any;
    typeProperties = [];
    typeProperty: any;
    habilitar: false;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

    solicitud2 = {
        type: "",
        ClientId: 1,
        TypeServiceId: "",
        wishDate: "",
        TypeRequestId: 3,
        state: "",
        municipality: "",
        parish: "",
        typeProperty: "",
        description: "",
        employee: ""
    }


    constructor(private modalService: NgbModal,
                public globalService: GlobalService) {

       this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });

            this.solicitud = {
                ClientId: 1,
                TypeServiceId: "",
                wishDate: "",
                TypeRequestId: 3
            } 
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
                this.typeService= [];
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

    @ViewChild('modalContent')
    modalContent: TemplateRef<any>;

    loadSpecifications(type){
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

    fechaClick($event) {
         console.log($event);
     }
   
     // Este metodo escucha el calendario y envia el evento mas la fecha
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
       
        console.log(date);
        console.log(events);
        this.test.fecha = moment(date).format('DD/MM/YYYY');
        console.log(this.test.fecha);
        if(events.length<2){
            console.log("hola");
           
        }else{
            console.log("hola 2");
        }
    }

     // Este metodo guarda 
    addEvent(): void {
        this.events.push({
          title: 'New event',
          start: startOfDay(new Date()),      
          color: colors.red,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
        this.refresh.next();
    }
    
    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        body.forEach(day => {
            if (day.date.getDate() % 2 === 1 && day.inMonth) {
                day.cssClass = 'odd-cell';
            }
        });
    }

    handleEvent(action: string, event: CalendarEvent): void {
        console.log(action);
        console.log(event);
        this.modalData = { event, action };
        this.modalService.open(this.modalContent, { size: 'lg' });
    }   

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }    
}