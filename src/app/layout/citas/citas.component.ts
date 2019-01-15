import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../../environments/environment';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay, subMonths, addMonths, startOfWeek, subWeeks, startOfMonth, endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { routerTransition } from '../../router.animations';
import * as datepicker from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
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
  selector: 'app-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  animations: [routerTransition()],
  providers: [GlobalsProvider]
})
export class CitasComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalDirective;

  view: CalendarPeriod = 'month';
  refresh: Subject<any> = new Subject();
  locale: string = 'es';
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = [0, 6];
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


  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService,
    private coolDialogs: NgxCoolDialogsService) {
    this.dateOrViewChanged();
  }

  ngOnInit() {
    this.minDate = subMonths(moment(new Date()).format('YYYY/MM/DD'), 0);
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.allTransaction();
    this.allAppointments();
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
        console.log(this.transaction[i].request.id);
        this.cita.RequestId = this.transaction[i].request.id;
      }
    }
  }

  changeCita($event) {
    console.log($event.target.value);
    this.cita.TypeAppointmentId = $event.target.value;
  }

  changeTurno($event) {
    console.log($event.target.value);
    this.cita.turn = $event.target.value;
  }


  dayClicked({ date, events }: { date: Date; events: any[] }): void {
    console.log(date);
    console.log(events);
    this.cita.dateAppointment = moment(date).format('DD/MM/YYYY');
    this.showChildModal();
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
        }
      }, (err) => {
        console.log(err);
      });

    }

   
  }

  clear() {
    this.hideChildModal();
  }
}