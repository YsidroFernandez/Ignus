import { Component, OnInit, ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView} from 'angular-calendar';
import { actividadescliente,cliente,colors,inmueble } from '../../../../../environments/environment';


@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  ngOnInit() {
  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  emailclient: any;
  emailagent: any;
  modalData: any;
  client = {correo: "", nombre: "",apellido: "",telefono:""}
  agent = {correo: "", nombre: "",apellido: "",telefono:""}
  casa = {direccion:"",foto:""}
  i=0;

  selactores(){
    console.log(this.modalData.emailclient)
      console.log(this.modalData.emailagent)
    for(var x in cliente){
      
      if (cliente[x].correo==this.modalData.emailclient){
        this.client=cliente[x];
        console.log(this.client)
      }
      if (cliente[x].correo==this.modalData.emailagent){
        this.agent=cliente[x];
        console.log(this.agent)
      }
      if(this.i=0){
      this.casa=inmueble[0];
      this.i=1
    }else{ this.casa=inmueble[1]; this.i=0}
      
    }
  }
  
  
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] =  actividadescliente
  activeDayIsOpen: boolean = true;

  locale: string = 'es';
  constructor(private modal: NgbModal) {}

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
    this.handleEvent(event);
    this.refresh.next();
  }

  handleEvent(event: CalendarEvent): void {
    this.modalData = event;
    console.log(this.modalData.title)
    this.selactores()

    console.log(inmueble[0])
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'Cosas que pasan',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
     
    });
    this.refresh.next()
    
  }

}
