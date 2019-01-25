import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay, subMonths, addMonths, startOfWeek, subWeeks, startOfMonth, endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as datepicker from 'ngx-bootstrap/datepicker';

type CalendarPeriod = 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
    return {
        day: addDays,
        week: addWeeks,
        month: addMonths
    }[period](date, amount);
}
function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
    return {
        day: subDays,
        week: subWeeks,
        month: subMonths
    }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
    return {
        day: startOfDay,
        week: startOfWeek,
        month: startOfMonth
    }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
    return {
        day: endOfDay,
        week: endOfWeek,
        month: endOfMonth
    }[period](date);
}
@Component({
    selector: 'app-registrosolicitud',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: [GlobalsProvider],
    animations: [routerTransition()]

})
export class RegistroSolicitudComponent implements OnInit {
    @ViewChild('childModal') childModal: ModalDirective;
    modalRef: BsModalRef;
    message: string;

    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;

    //para los disabled generales
    public lock = false;
    public lockcheck = false;
    //para que aparezca el buscar
    public buscar = false;
    //para el disabled de las especificaciones
    public activatespecifications = false;
    //para el disabled de las especificaciones
    public activatecalendar = false;
    excludeDays: number[] = [];
    public dispAM = false;
    public dispPM = false;
    public solicitudes: any;
    public nuevo: any;
    public id_employeeRegist: any;
    public employes = [];
    public states = [];
    public municipalities = [];
    public parishes = [];
    public typeService = [];
    public typeProperties = [];
    public typeProperty: any;
    public search: String;
    public bloq = false;
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
    appointmentSchedule: any = {
        appointments: [],
        excludeDays: []
      };
    minDate: Date;
    id_employee : any;
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;
    avatar: any;
    
    public viewCalendar = false;
    view: CalendarPeriod = 'month';

    refresh: Subject<any> = new Subject();
    locale: string = 'es';
    activeDayIsOpen: boolean = true;
    viewDate: Date = new Date();
    listspecification: any[]
    events: any = [  ];

    public test: any = {
        fecha: '',
        descripcion: '',
        turno: ''
    }
    closeResult: string;

    public solicitud: any = {
        ClientId: Number.parseInt(JSON.parse(localStorage.person).id),
        employeeId: '',
        wishDate: '',
        buildDate: '',
        turn: '',
        propertyId: '',
        typeProperty: '',
        TypeServiceId: '',
        TypeRequestId: 3,
        state: '',
        municipality: '',
        parish: '',
        ubication: '',
        typeSpecifications: [],
    };

    submitType: string = 'Save';
    selectedRow: number;


    constructor(private modalService: NgbModal,
        public globalService: GlobalService,
        private coolDialogs: NgxCoolDialogsService,
        private toastr: ToastrService) {
        this.dateOrViewChanged();
        this.search = '';
        console.log('Called Constructor');
        if(localStorage.getItem('propertyId')){
            this.search = localStorage.getItem('propertyId');
            this.searchPropertyId()
            localStorage.removeItem('propertyId');
        }
        this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });
    }

    ngOnInit() {
        this.typeServices();
        this.allStates();
        this.alltypeProperty();
        this.allEmployee();
        this.minDate = subMonths(moment(new Date()).format('YYYY/MM/DD'), 0);
    }

    allAppointmentSchedule () {
        this.globalService.getModel(`/api/appointment/schedule?userId=${this.id_employee}`).then((result) => {
          if (result['status']) {
            this.appointmentSchedule = [];
            this.appointmentSchedule = result['data'];
            console.log(this.appointmentSchedule);
            this.excludeDays  = this.appointmentSchedule.excludeDays;
            for(let appointment of this.appointmentSchedule.appointments){
              appointment.start = startOfDay(appointment.dateAppointmentUS)
            }
            this.events=this.appointmentSchedule.appointments
           
            this.refresh.next();
          }
        }, (err) => {
          console.log(err);
        });  
      }

    typeServices() {
        this.globalService.getModel("/api/typeService").then((result) => {
            if (result['status']) {
                this.typeService = [];
                this.typeService = result['data'];
            }
        }, (err) => {
            console.log(err);
        });
    }

    allStates() {
        this.globalService.getModel(`/api/state/`).then((result) => {
            if (result['status']) {
                this.states = [];
                this.states = result['data'];
            }
        }, (err) => {
            console.log(err);
        });
    }

    alltypeProperty() {
        this.globalService.getModel(`/api/typeProperty`).then((result) => {
            if (result['status']) {
                this.typeProperties = [];
                this.typeProperties = result['data'];
            }
        }, (err) => {
            console.log(err);
        });
    }

    allEmployee() {
        this.globalService.getModel(`/api/employee`).then((result) => {
            if (result['status']) {
                this.employes = [];
                this.employes = result['data'];
                console.log("este es el buscado", this.employes);
            }
        }, (err) => {
            console.log(err);
        });
    }

    changeservice(){
        this.buscar = this.typeService.find(x => x.id == this.solicitud.TypeServiceId).offeringProperty
    }

    loadSpecifications(type) {
        this.solicitud.typeSpecifications = [];
        this.globalService.getModel(`/api/typeProperty/specification/${type}`).then((result) => {
            if (result['status']) {
                this.solicitud.typeSpecifications = result['data']
                this.activatespecifications = true;
            }

        }, (err) => {
            console.log(err);
        });

    }

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
        this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.parishes = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }
    
    searchPropertyId(){
       
    if(this.search!=""){
    this.globalService.getModel(`/api/property/`+this.search).then((result) => {
        if (result['status']) {
            this.solicitud.propertyId = this.search
            //Para que actualice la lista una vez que es creado el recaudo
            var property = result['data']
            
            if(property.TypeService.offeringProperty==true){
                
             
            this.solicitud.employeeId = property.employeeId;
            this.solicitud.typeProperty = property.typeProperty.id;
            this.solicitud.buildDate = property.buildDate;
            this.solicitud.TypeServiceId = property.TypeService.id
            
            this.solicitud.state = property.state.id;
            this.loadmunicipality(property.state.id)
            this.solicitud.municipality = property.municipality.id;
        
            this.loadparish(property.municipality.id)
            this.solicitud.parish = property.parish.id;
            this.solicitud.ubication = property.ubication;
            this.solicitud.typeSpecifications = property.typeSpecifications;
            this.lock = true;
            this.activatespecifications = true;
            this.lockcheck = true;
            }else{
                this.limpiar()
                this.toastr.info('El inmueble solicitado no existe', 'por favor intente nuevamente', {
                    timeOut: 5000,
                    progressBar: true,
                    positionClass: 'toast-bottom-right'
                  })
            }  
        }else{
            this.limpiar()
            this.toastr.info('El inmueble solicitado no existe', 'por favor intente nuevamente', {
                timeOut: 5000,
                progressBar: true,
                positionClass: 'toast-bottom-right'
              })
        }
    }, (err) => {
        console.log(err);
    });
    }
    }
    
    // This method associate to New Button.
    enviar() {
        this.nuevo = {};
        this.nuevo = {
            ClientId: Number.parseInt(JSON.parse(localStorage.person).id),
            EmployeeId: Number.parseInt(this.id_employeeRegist),
            PropertyId: Number.parseInt(this.solicitud.propertyId),
            wishDate: this.solicitud.wishDate,
            turn: this.solicitud.turn,
            TypePropertyId: Number.parseInt(this.solicitud.typeProperty),
            TypeServiceId: Number.parseInt(this.solicitud.TypeServiceId),
            TypeRequestId: this.solicitud.TypeRequestId,
            ParishId: Number.parseInt(this.solicitud.parish),
            direction: this.solicitud.direction,
            typeSpecifications: this.solicitud.typeSpecifications,
            buildDate: this.solicitud.buildDate
        };
        console.log("result", this.nuevo);
        this.globalService.addModel(this.nuevo, "/api/request/pending")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el recaudo
                    
                    //setInterval(location.href="./dashboardcustomer",3000)
                }
            }, (err) => {
                console.log(err);
            });
            
    }

    limpiar() {
        this.solicitud = {
            ClientId: Number.parseInt(JSON.parse(localStorage.person).id),
            employeeId: '',
            propertyId: '',
            wishDate: '',
            buildDate: '',
            turn: '',
            typeProperty: '',
            TypeServiceId: '',
            TypeRequestId: 3,
            state: '',
            municipality: '',
            parish: '',
            direction: '',
        }
        this.lock = false;
        this.lockcheck = false;
        this.buscar = false;
        this.activatespecifications = false; 
        this.activatecalendar = false;
        this.search = '';   
    }
    
    anterior(){
        document.getElementById("first-link").click()
        }

    siguiente(){
    document.getElementById("second-link").click()
    }

    // Este metodo escucha el calendario y envia el evento mas la fecha
    dayClicked({ date, events }: { date: Date; events: any[] }): void {
        this.dispAM = false;
        this.dispPM = false;
        if(this.bloq){
            console.log("esta bloqueado");
        }else{
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
                            title: 'Solicitud de Cita',
                            turno: 'AM',
                            color: this.colors.red,
                        });
                        this.hideChildModal();
                        this.refresh.next();
                        this.bloq = true;
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
                            title: 'Solicitud de Cita',
                            turno: 'PM',
                            color: this.colors.red,
                        });
                        this.hideChildModal();
                        this.refresh.next();
                        this.bloq = true;
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

    today(): void {
        this.changeDate(new Date());
    }

    dateIsValid(date: Date): boolean {
        return date >= this.minDate;
    }

    changeDate(date: Date): void {
        this.viewDate = date;
        this.dateOrViewChanged();
    }


    changeView(view: CalendarPeriod): void {
        this.view = view;
        this.dateOrViewChanged();
    }

    dateOrViewChanged(): void {
        this.prevBtnDisabled = !this.dateIsValid(
            endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
        );
        this.nextBtnDisabled = !this.dateIsValid(
            startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
        );
        if (this.viewDate < this.minDate) {
            this.changeDate(this.minDate);
        }
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        body.forEach(day => {
            if (!this.dateIsValid(day.date)) {
                day.cssClass = 'cal-disabled';
            }
        });
    }

    selectAgente(data) {
        console.log(data);
         this.avatar = {};
        if (data != '') {
          
            this.id_employee = data.user.id;
            this.id_employeeRegist = data.person.id;
            this.allAppointmentSchedule ();
            this.viewCalendar = true;
            for(var i=0;i<this.employes.length;i++){
                if(this.employes[i].person.id ==  this.id_employee){
                    this.avatar = this.employes[i].user.urlAvatar;
                }
            }
            console.log(this.avatar);
        }else{
            this.viewCalendar = false; 
        }       

        console.log( this.id_employee);
      
        console.log(  this.id_employeeRegist );
    }
}