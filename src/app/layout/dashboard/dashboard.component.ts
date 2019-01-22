import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { single, single2, lineData, multi } from "./data";
import { GlobalService } from "../../providers/global.service";
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from "rxjs";
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from "angular-calendar";
import {
  actividadescliente,
  cliente,
  colors,
  inmueble
} from "../../../environments/environment";
import { startOfDay, subMonths, addMonths, startOfWeek, subWeeks, startOfMonth, endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
type CalendarPeriod = 'month';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [routerTransition()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  single: any[];
  single2: any[];
  multi: any[];
  lineChartMulti: any[];
  lineData: any[];
  view1: any[] = [500, 200];
  view2: any[] = [500, 500];
  // options graps dashboard
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";
  contTransactions: any;
  contIncidences: any ;
  contRequests: any ;
  contCustomers: any;
  colorScheme = {
    domain: ["#1D6CD3", "#02C553", "#FFB600", "#F22424", "#3B3947"]
  };


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
  message: string;
  closeResult: string;
  submitType: string = 'Save';
  selectedRow: number;
  user: any;
  public cita: any = {
    dateAppointment: '',
    RequestId: '',
    turn: '',
    TypeAppointmentId: '',
    reason: '',

  }
  transaction = [];
  appointment = [];
  typeAppointments = [];
  list = [];


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
  constructor(private modal: NgbModal, public globalService: GlobalService) {
    Object.assign(this, { single, single2, lineData, multi });
    this.contCustomers={};
    this.contIncidences={};
    this.contRequests={};
    this.contTransactions={};
  }

  ngOnInit() {
    this.geDataCount();
   //metodos para calendario
    this.minDate = subMonths(moment(new Date()).format('YYYY/MM/DD'), 0);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.allTransaction();
    this.allAppointments();
    this.allAppointmentSchedule ();
  }

  geDataCount() {
    this.contCustomers.count=0;
    this.contIncidences.count=0;
    this.contRequests.count=0;
    this.contTransactions.count=0;
    let user = localStorage.getItem("user");
    console.log(user);
    let obj = JSON.parse(user);
    //contador de incidencias
    this.globalService
      .getModel_Id(obj.id.toString(), "/api/incidence/count")
      .then(
        result => {
          
          this.contIncidences = result["data"];
          console.log(this.contIncidences)
        },
        err => {
          console.log(err);
        }
      );
    //contador de transacciones
    this.globalService
      .getModel_Id(obj.id.toString(), "/api/transaction/count")
      .then(
        result => {
          this.contTransactions = result["data"];
          console.log(this.contTransactions)
        },
        err => {
          console.log(err);
        }
      );
    //contador de solicitudes
    this.globalService
      .getModel_Id(obj.id.toString(), "/api/request/count")
      .then(
        result => {
          this.contRequests = result["data"];
          console.log(this.contRequests)
        },
        err => {
          console.log(err);
        }
      );
    //contador de clientes
    this.globalService
      .getModel_Id(obj.id.toString(), "/api/transaction/count")
      .then(
        result => {
          this.contCustomers = result["data"];
        },
        err => {
          console.log(err);
        }
      );
  }

  //codigo por eliminar


  addEvent(): void {
    this.events.push({
      title: "Cosas que pasan",
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }





  allAppointmentSchedule () {
    this.globalService.getModel(`/api/appointment/schedule?userId=${this.user.id}`).then((result) => {
      if (result['status']) {
        this.appointmentSchedule = [];
        this.appointmentSchedule = result['data'];
        
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

  allTransaction() {
    this.globalService.getModel(`/api/employee/transaction/${this.user.id}?status=I,P`).then((result) => {
      if (result['status']) {
        this.transaction = [];
        this.transaction = result['data'];
        console.log(this.transaction);
      }
    }, (err) => {
      console.log(err);
    });
  }

  allAppointments() {
    this.globalService.getModel("/api/typeAppointment").then((result) => {
      this.typeAppointments = result['data'];
      console.log(this.typeAppointments);
    }, (err) => {
      console.log(err);
    });
  }

  changeTransaction($event) {
    for (var i = 0; i < this.transaction.length; i++) {
      if (this.transaction[i].id == $event.target.value) {
        this.cita.RequestId = this.transaction[i].request.id;
      }
    }
  }

  changeCita($event) {
    this.cita.TypeAppointmentId = $event.target.value;
  }

  changeTurno($event) {
    this.cita.turn = $event.target.value;
  }


  dayClicked({ date, events }: { date: Date; events: any[] }): void {

    if (events.length < 2 && moment(date).format('DD/MM/YYYY') >= moment(new Date()).format('DD/MM/YYYY')) {
    this.cita.dateAppointment = moment(date).format('DD/MM/YYYY');
    this.showChildModal();
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
          this.hideChildModal();
          this.allAppointmentSchedule (); 
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }

  clear() {
    this.hideChildModal();
  }
}
