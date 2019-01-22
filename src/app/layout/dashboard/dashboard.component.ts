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
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import { Subject } from "rxjs";
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
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [routerTransition()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  excludeDays: number[] = [];
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

  constructor(private modal: NgbModal, public globalService: GlobalService) {
    Object.assign(this, { single, single2, lineData, multi });
    this.contCustomers={};
    this.contIncidences={};
    this.contRequests={};
    this.contTransactions={};
  }

  ngOnInit() {
    this.geDataCount();
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
  @ViewChild("modalContent")
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  emailclient: any;
  emailagent: any;
  modalData: any;
  client = { correo: "", nombre: "", apellido: "", telefono: "" };
  agent = { correo: "", nombre: "", apellido: "", telefono: "" };
  casa = { direccion: "", foto: "" };
  i = 0;

  selactores() {
    console.log(this.modalData.emailclient);
    console.log(this.modalData.emailagent);
    for (var x in cliente) {
      if (cliente[x].correo == this.modalData.emailclient) {
        this.client = cliente[x];
        console.log(this.client);
      }
      if (cliente[x].correo == this.modalData.emailagent) {
        this.agent = cliente[x];
        console.log(this.agent);
      }
      if ((this.i = 0)) {
        this.casa = inmueble[0];
        this.i = 1;
      } else {
        this.casa = inmueble[1];
        this.i = 0;
      }
    }
  }

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = actividadescliente;
  activeDayIsOpen: boolean = true;

  locale: string = "es";

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
    console.log(this.modalData.title);
    this.selactores();

    console.log(inmueble[0]);
    this.modal.open(this.modalContent, { size: "lg" });
  }

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
}
