import {Component,OnInit,ChangeDetectionStrategy,ViewChild,TemplateRef, ViewEncapsulation, ElementRef} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,DAYS_OF_WEEK } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { startOfDay,subMonths,addMonths, startOfWeek, subWeeks, startOfMonth,endOfWeek, endOfDay, addWeeks, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { GlobalService } from '../../providers/global.service';
import { GlobalsProvider } from '../../shared';
import * as datepicker from 'ngx-bootstrap/datepicker';
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

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
  public numPage: number;
  public pages = 1;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'es';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  cita:any;
  citas:any;
  nuevo: any;
  // It maintains recaudos form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Editado', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Borrado', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = []
  activeDayIsOpen: boolean = true;
  closeResult: string;
  msg = '';

  constructor(private modal: NgbModal,  private globals: GlobalsProvider, public globalService: GlobalService) {

    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false },
      { dateInputFormat: 'DD/MM/YYYY' },
      { locale: 'es' });
  }

  open(content) {
    this.modal.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
   }
, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
}

  private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

  delete(index: number) {
       if(confirm('¿Estas seguro de eliminar este Inmueble?')){
        this.cita.splice(index, 1);
        this.msg = 'Campo Eliminado Exitosamente';
      }
      }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnInit() {
    this.numPage = this.globals.numPage;     
  }

  // faEye = faEye;
  // faEdit = faEdit;
  // faTrash = faTrash;

  onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.cita = Object.assign({}, this.citas[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar esta cita?')){
        this.globalService.removeModel(this.cita.id, "/api/requirement")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la cita
                        this.globalService.getModel("/api/requirement")
                            .then((result) => {
                                console.log(result);
                                this.citas= result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
        }

}

}