import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay,subMonths,addMonths, startOfWeek, subWeeks, startOfMonth,endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';


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
    minDate: Date;    

    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;

    @ViewChild('childModal') childModal: ModalDirective;
  
    view: CalendarPeriod = 'month';

    refresh: Subject<any> = new Subject();   
    locale: string = 'es';
    activeDayIsOpen: boolean = true;
    excludeDays: number[] = [0, 6];
    viewDate: Date = new Date();
    listspecification: any[]
    events: any = [
        {
            start: startOfDay('2019/01/04'),
            title: 'jajajaaj',
            turno: 'AM',
            color: this.colors.red
        },
        {
            start: startOfDay('2019/01/04'),
            title: 'test2',
            turno: 'PM',
            color: this.colors.yellow
        },
        {
            start: startOfDay('2019/01/08'),
            title: 'otros',
            turno: 'AM',
            color: this.colors.yellow
        }
    ];

    public test: any = {
        fecha: '',
        descripcion: '',
        turno: ''
    }   
    closeResult: string;
    
    public solicitudes: any;
    public nuevo: any;
    public employes = [];
    public states = [];
    public municipalities = [];
    public parishes = [];

    public typeService: any;
    public typeProperties = [];
    public typeProperty: any;

    public solicitud: any = {
        userId: Number.parseInt(JSON.parse(localStorage.user).id),
        employeeId: '',
        wishDate: '',
        turn: '',
        typeProperty: '',
        TypeServiceId: '',
        TypeRequestId: 3,
        state: '',
        municipality: '',
        parish: '',
        direction: '',
        description: '',
        typeSpecifications: [],
    };
    
    submitType: string = 'Save';
    selectedRow: number;

    
    constructor(private modalService: NgbModal,
        public globalService: GlobalService,
        private coolDialogs: NgxCoolDialogsService) {
        this.dateOrViewChanged();
    }

    ngOnInit() {

        this.minDate = subMonths(moment(new Date()).format('YYYY/MM/DD'), 0);
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

    }  

    loadSpecifications(type){
        document.getElementById("tabspecification").setAttribute("style","")
        this.solicitud.typeSpecifications = [];
        this.globalService.getModel(`/api/typeProperty/specification/${type}`).then((result) => {
            if (result['status']) {        
                this.solicitud.typeSpecifications = result['data']
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
        this.nuevo = {};
        this.nuevo = {
            userId: Number.parseInt(JSON.parse(localStorage.user).id),
        employeeId: Number.parseInt(this.solicitud.employeeId),
        wishDate: this.solicitud.wishDate,
        turn: this.solicitud.turn,
        typeProperty: Number.parseInt(this.solicitud.typeProperty),
        TypeServiceId: Number.parseInt(this.solicitud.TypeServiceId),
        TypeRequestId: this.solicitud.TypeRequestId,
        parish: Number.parseInt(this.solicitud.parish),
        direction: this.solicitud.direction,
        description: this.solicitud.description,
        typeSpecifications: this.solicitud.typeSpecifications
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
            alert("Agregado con exito")
        this.limpiar()
    }

    limpiar() {
        this.solicitud = {
        userId: Number.parseInt(JSON.parse(localStorage.user).id),
        employeeId: '',
        wishDate: '',
        turn: '',
        typeProperty: '',
        TypeServiceId: '',
        TypeRequestId: 3,
        state: '',
        municipality: '',
        parish: '',
        direction: '',
        description: '',
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
                        color: this.colors.red,
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
                            color: this.colors.red,
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

    // increment(): void {
    //     this.changeDate(addPeriod(this.view, this.viewDate, 1));
    //   }
    
    //   decrement(): void {
    //     this.changeDate(subPeriod(this.view, this.viewDate, 1));
    //   }
    
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

    buscarxcodigo(){
        console.log(this.solicitud)
     
    }

    transform_check(valor,tipo,indicador){
  
        for(var te in valor){
            if(valor[te].name==tipo){
                for(var esp in valor[te].specifications_checkbox){
                    if(valor[te].specifications_checkbox[esp].name==indicador){
                        if(valor[te].specifications_checkbox[esp].bin_quantity == "true"){
                            valor[te].specifications_checkbox[esp].bin_quantity = false    
                        }else{
                        valor[te].specifications_checkbox[esp].bin_quantity = true
                    }
                    console.log(this.solicitud.typeSpecifications[te].specifications_checkbox[esp])
                    }
                }
            }
        }
       
    }
}