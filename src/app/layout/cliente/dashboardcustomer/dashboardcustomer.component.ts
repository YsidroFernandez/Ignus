import { Component, OnInit,ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef } from '@angular/core';
  import { routerTransition } from '../../../router.animations';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../providers/global.service';
import { GlobalsProvider } from '../../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay, subMonths, addMonths, startOfWeek, subWeeks, startOfMonth, endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';

import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';


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
  @ViewChild('parentModal') parentModal: ModalDirective;
  // @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
    public numbPage: number;
    public numPage: number;
    public solicitudSelect: any = {wishDate: '',typeRequest: {name:'',description:''}};
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

  public cita: any = {
    dateAppointment: '',
    RequestId: '',
    turn: '',
    TypeAppointmentId: '',
    reason: '',

  }

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
      private modal: NgbModal, 
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

  ngOnInit() {
    this.numPage = this.globals.numPage;       
    this.numbPage = this.globals.numPage;       
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

    open(content) {

      this.modal.open(content).result.then((result) => {
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

    dayClicked({ date, events }: { date: Date; events: any[] }): void {

      if (events.length < 2 && moment(date).format('DD/MM/YYYY') >= moment(new Date()).format('DD/MM/YYYY')) {
      this.cita.dateAppointment = moment(date).format('DD/MM/YYYY');
      // this.showChildModal();
      }
    }

    handleEvent(action: string, event: CalendarEvent): void {
      console.log(event);
      console.log(action);
      if(action=='Clicked'){
        this.data = event;
        this.viewData = true;
        console.log(this.data);
        this.showPrentModal();
      }
     
      // this.modalData = { event, action };
      // this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    showPrentModal(): void {
      this.parentModal.show();
    }
  
    hidePrentModal(): void {
      this.parentModal.hide();
    }
  
    today(): void {
      this.changeDate(new Date());
    }
  
    // dateIsValid(date: Date): boolean {
    //   return date >= this.minDate;
    // }
  
    changeDate(date: Date): void {
      this.viewDate = date;
      // this.dateOrViewChanged();
    }
  
    changeView(view: CalendarPeriod): void {
      this.view = view;
      // this.dateOrViewChanged();
    }

   
  save() {
    console.log(this.cita);
    if(this.cita.RequestId==''|| this.cita.TypeAppointmentId==''|| this.cita.dateAppointment==''
    || this.cita.reason=='' || this.cita.turn==''){
      return;
    }else{
      this.globalService.addModel(this.cita, "/api/appointment").then((result) => {
        if (result['status']) {
          console.log(result['status']);
          // this.hideChildModal();
          this.allAppointmentSchedule (); 
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  
  faEye = faEye;

}
