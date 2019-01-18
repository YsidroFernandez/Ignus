import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import { GlobalService } from '../../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as querystring from 'querystring';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
  animations: [routerTransition()]
})
export class ServicioComponent implements OnInit {

  datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
  selectedValue: string = "";
  values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];
    imagen: any;
    agencia: any;
    agencias: any;

    public typeService = [];
    public transactions: any = [];
    public view = false;
    public chart: any;
    servicios: any = [];
    fechaI: any;
    fechaF: any;

    public servicio: any = {
      ClientId: Number.parseInt(JSON.parse(localStorage.person).id),
      employeeId: '',
      wishDate: '',
      turn: '',
      typeProperty: '',
      TypeServiceId: '',
      TypeRequestId: 3,
      state: '',
      municipality: '',
      parish: '',
      ubication: '',
      description: '',
      typeSpecifications: [],
  };

  query: any = {}
  logoURL: string = ""
  chartDefaultConfiguration: any = {
      chart: {
          renderTo: 'graficaLineal', 	// Le doy el nombre a la gráfica
          defaultSeriesType: 'line'	// Pongo que tipo de gráfica es

      },
      title: {
          text: 'Servicios'	// Titulo (Opcional)
      },
      xAxis: {
          categories: []
      },

      yAxis: {
          // Pongo el título para el eje de las 'Y'
          title: {
              text: 'Promedios de Servicios'
          }
      },
      // Doy formato al la "cajita" que sale al pasar el ratón por encima de la gráfica
      tooltip: {
          enabled: true,
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  this.x + ': ' + this.y + ' ' + this.series.name;
          }
      },
      // Doy opciones a la gráfica
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
          }
      }

  };


    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
        let now = moment().format();
        console.log('hello world', this.tipos);

        var doc = new jspdf('p', 'pt');
    }
    downloadImagePDF(){
        var doc = new jspdf()
        var data = document.getElementById('content');
        html2canvas(data).then(canvas => {
          // Few necessary setting options
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
          var position = 0;
          //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight)
          doc.setFontSize(30)
          doc.text(55, 25, 'Reportes Estadisticos')
          var img = new Image();
          img.src = "./../../assets/images/ignus3.png"
          doc.addImage(img, 'PNG', 0,3,30,30)
          doc.addImage(img, 'PNG', 180,3,30,30)
          doc.save("Reporte.pdf")
        });

          }


  ngOnInit() {
    this.typeServices();
  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
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

loadTransactions() {
  this.globalService.getModel("/api/typeService").then((result) => {
      if (result['status']) {
          this.typeService = [];
          this.typeService = result['data'];
      }
  }, (err) => {
      console.log(err);
  });
}


buscar() {


  this.view = true;
  this.query = {
      typeS: this.servicio.id,
      start: this.fechaI ? moment(this.fechaI).format('YYYY/MM/DD') : "",
      end: this.fechaF ? moment(this.fechaF).format('YYYY/MM/DD') : ""
  }
  const stringified = querystring.stringify(this.query)
  console.log(stringified);

  this.globalService.getModel("/api/report/request?"+stringified)
  .then((result) => {
      let dataAPI = result['data'];
      this.chartDefaultConfiguration = {...this.chartDefaultConfiguration, ...dataAPI}
      console.log(this.chartDefaultConfiguration)
      this.chart = new Chart(this.chartDefaultConfiguration);
  }, (err) => {
      console.log(err);
  });
}

}
