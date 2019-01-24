import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../providers/global.service';
import { GlobalsProvider } from '../../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay, subMonths, addMonths, startOfWeek, subWeeks, startOfMonth, endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


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
  selector: 'app-dashboardcustomer',
  templateUrl: './dashboardcustomer.component.html',
  styleUrls: ['./dashboardcustomer.component.scss'],
  animations: [routerTransition()],
  providers: [GlobalsProvider]
  
})
export class DashboardcustomerComponent implements OnInit {
    public numbPage: number;
    public numPage: number;
    public solicitudSelect: any;
    public transaccionSelect: any;
    public pages = 1;
    public usuario : any;
    appointmentSchedule: any = {
        appointments: [],
        excludeDays: []
      };
      view: CalendarPeriod = 'month';
  refresh: Subject<any> = new Subject();
  locale: string = 'es';
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = [];
  viewDate: Date = new Date();
  public minDate: Date;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  modalRef: BsModalRef;

    closeResult: string;
    clientes: any;
    cliente: any;
    nuevo: any;
    user:any;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;
    searchfilter: string;

  public listTransacciones:any;
  public listSolicitudes:any;
  public listScheduler: any = [];


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
      }
    }
  ];

  events: any = [
    {
      start: '',
      title: '',
      turno: '',
      color: '',
      actions: [{}]
    }
  ];

  data: any = {
    
  };

  public viewData = false;

  constructor(
      private modalService: NgbModal, 
      private globals: GlobalsProvider, 
      public globalService: GlobalService) {
    
        this.minDate = subMonths(moment(new Date()).format('YYYY/MM/DD'), 0);
        this.user = JSON.parse(localStorage.user);
    this.clientes = [];
    this.cliente = [];
    this.nuevo = [];
    this.allAppointmentSchedule()
    } 

  allAppointmentSchedule () {
    
    this.globalService.getModel(`/api/appointment/schedule?userId=${this.user.id}`).then((result) => {
      if (result['status']) {
        this.appointmentSchedule = [];
        this.appointmentSchedule = result['data'];
        
        this.excludeDays  = this.appointmentSchedule.excludeDays;
        for(let appointment of this.appointmentSchedule.appointments){
          appointment.start = startOfDay(appointment.dateAppointmentUS)
          var x = new Date();
          var y = new Date(appointment.dateAppointment)
          console.log(y , " ", x)
          if( y > x){
              console.log(appointment)
            this.listScheduler.push(appointment)
          }
        }
        
        this.events=this.appointmentSchedule.appointments
       
        this.refresh.next();
      }
    }, (err) => {
      console.log(err);
    });  
  }
 open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
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

    show() {
        console.log("aqui va el loaer");
    }

  ngOnInit() {
    this.numPage = this.globals.numPage;       
    this.numbPage = this.globals.numPage;       
    this.show();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
      let id=  this.usuario.person.id;
      this.globalService.getModel('/api/client/request/'+id)
      .then(res=>{
        this.listSolicitudes=res['data'];
        console.log("Las solicitudes: ",this.listSolicitudes);
      },
      error=>{
          console.log(error);
      })

      this.globalService.getModel('/api/client/transaction/'+ id)
      .then(res=>{
          this.listTransacciones=res['data'];
          console.log("Las transacciones:",this.listTransacciones);
      },
      error=>{
          console.log(error);
      })

  }

    detallesSolicitud(solicitud){
        this.solicitudSelect=solicitud;
    }

    detTransaccion(transaccion){
        this.transaccionSelect = transaccion;
        console.log("Es este",this.transaccionSelect)
    }

  faEye = faEye;

}
