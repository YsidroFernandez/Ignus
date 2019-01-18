import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
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
    selector: 'app-cita',
    templateUrl: './cita.component.html',
    styleUrls: ['./cita.component.scss'],
    animations: [routerTransition()]

})
export class CitaComponent implements OnInit {
    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];
    imagen: any;
    agencia: any;
    agencias: any;
    fechaI: any;
    fechaF: any;
    empleado: any = {
        person: {id: '', firstName: ''}
    };
    employeeId: number;
    empleados: any = [];
    servicio: any= {
        id: '',
        name: ''
    };
    statusAppointments: any = [
        {
            name: "Confirmada",
            value: "C"
        },{
            name: "Ejecutada",
            value: "E"
        },{
            name: "Solicitada",
            value: "S"
        }
    ]
    selectedStatus: string
    servicios: any = [];
    public view = false;
    public chart: any;
    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
        let now = moment().format();
        console.log('hello world', this.tipos);

        var doc = new jspdf('p', 'pt');
    }

    convertImgToBase64URL(url, callback){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }


    downloadImagePDF(){
        this.convertImgToBase64URL('https://ignus-backend-jchiquin.c9users.io/public/imgs/logo/basic-logo.png', (base64Img) =>{
            this.imagen = base64Img; // myBase64 is the base64 string
            var doc = new jspdf()
        var data = document.getElementById('content');
        html2canvas(data).then(canvas => {
          // Few necessary setting options
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          var position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, 75, imgWidth, imgHeight)
          doc.setFontSize(10)
          doc.text(78, 25, this.agencias.name+" "+this.agencias.rif)
          doc.setFontSize(10)
          let middleUbication = this.agencias.ubication.lastIndexOf(' ',this.agencias.ubication.length/2)
          doc.text(70, 30, this.agencias.ubication.substr(0,middleUbication))
          doc.text(71, 35, this.agencias.ubication.substr(middleUbication+1,this.agencias.ubication.length))
          doc.setFontSize(10)
          doc.text(84, 40, this.agencias.phoneNumber+ " / " +this.agencias.phoneNumber2)
          doc.setFontSize(30)
          doc.text(55, 60, 'Reportes Estadisticos')
          doc.addImage("data:image/jpeg;base64,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",'PNG', 9,3,32,30)
          doc.addImage("data:image/jpeg;base64,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",'PNG', 169,3,32,30)
          doc.addImage(this.imagen, 'PNG', 10,3,30,30)
          doc.addImage(this.imagen, 'PNG', 170,3,30,30)
 
          doc.save("Reporte-Citas.pdf") 
        });
        });


          }

          allReporte(){
            const stringified = querystring.stringify({StartDate: moment(this.servicio.fechaI).format('DD/MM/YYYY'), EndDate: moment(this.servicio.fechaF).format('DD/MM/YYYY'), id: this.servicio.id, employee: this.empleado.person.id, status: this.selectedStatus })
            console.log(stringified);
            // this.globalService.getModel("/api/agency")
            // .then((result) => {
            //     console.log(result);
            //     this.agencias = result['data'];
            //     console.log(this.agencias);
            // }, (err) => {
            //     console.log(err);
            // });
        }

    allAgency(){
        this.globalService.getModel("/api/agency")
        .then((result) => {
            console.log(result);
            this.agencias = result['data'];
            console.log(this.agencias);
        }, (err) => {
            console.log(err);
        });
    }
    
    allEmployee(){
        this.globalService.getModel("/api/employee")
        .then((result) => {
            console.log(result);
            this.empleados = result['data'];
            console.log(this.empleados);
        }, (err) => {
            console.log(err);
        });
    }

    allService(){
      this.globalService.getModel("/api/typeService")
        .then((result) => {
          console.log(result);
          this.servicios = result['data'];
          console.log(this.servicios);
        }, (err) => {
          console.log(err);
        });
    }

    ngOnInit() {
        this.allAgency();
        this.allService();
        this.allEmployee();
    }


    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }
    buscar() {
        this.view = true;
        this.chart = new Chart({
            chart: {
                renderTo: 'graficaLineal', 	// Le doy el nombre a la gráfica
                defaultSeriesType: 'line'	// Pongo que tipo de gráfica es

            },
            title: {
                text: 'Citas'	// Titulo (Opcional)
            },
            // Pongo los datos en el eje de las 'X'
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                // Pongo el título para el eje de las 'X'
                title: {
                    text: 'Meses'
                }
            },
            yAxis: {
                // Pongo el título para el eje de las 'Y'
                title: {
                    text: 'Promedios de citas'
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
            },
            // Doy los datos de la gráfica para dibujarlas
            series: [{
                name: 'Atendidas',
                data: [103, 474, 345, 536, 1041, 270, 676, 160, 2462, 2321, 3527, 566]
            },
            {
                name: 'En espera',
                data: [12, 3435, 34, 810, 213, 787, 3435, 1991, 3122, 3434, 3655, 545]
            },
            {
                name: 'Cancelada por el cliente',
                data: [456, 1648, 3121, 55, 65, 397, 680, 325, 3732, 67, 5226, 3434]
            },
            {
                name: 'Cancelada por el agente',
                data: [1064, 45, 1040, 1076, 788, 397, 680, 34, 4545, 6067, 878, 5656]
            }],
        });
    }
}
