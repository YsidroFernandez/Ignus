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


buscar(data) {
    this.view = true;
    console.log(data);

    if (data == 3) {
        this.chart = new Chart({
            chart: {
                renderTo: 'graficaCircular',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentaje de Visitas por Transsaciones'
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' $';
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.y + ' $';
                        },
                    }, showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Verificación de documento', 100],
                    ['Evaluación estructural', 150],
                    ['Acesoria', 1000],
                    ['Ingreso por venta al cliente', 6500]
                ]
            }]
        });
    } else if (data == 1) {
     this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Reporte por ordenes de servicio'
            },
            xAxis: {
                categories: ['Ene', 'Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],

            },
            yAxis: {
                title: {
                    text: 'Porcentaje de servicio solicitado'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    // borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            "series": [
                {
                    "name": "Servicio",
                    // "colorByPoint": true,
                    "data": [
                        {
                            "name": "Venta ",
                            "y": 62.74,
                            "drilldown": "Venta"
                        },
                        {
                            "name": "Alquiler ",
                            "y": 10.57,
                            "drilldown": "Alquiler"
                        },
                        {
                            "name": "Venta ",
                            "y": 7.23,
                            "drilldown": "Venta"
                        },
                        {
                            "name": "Compra ",
                            "y": 5.58,
                            "drilldown": "Compra"
                        },
                        {
                            "name": "Compra ",
                            "y": 4.02,
                            "drilldown": "Compra"
                        },
                        {
                            "name": "Alquiler ",
                            "y": 1.92,
                            "drilldown": "Alquiler"
                        },
                        {
                            "name": "Alquiler ",
                            "y": 7.62,
                            "drilldown": "Alquiler"
                        }
                    ]
                }
            ],
            "drilldown": {
                "series": [
                    {
                        "name": "Venta",
                        "id": "Venta",
                        "data": [
                            [
                                "v65.0",
                                0.1
                            ],
                            [
                                "v64.0",
                                1.3
                            ],
                            [
                                "v63.0",
                                53.02
                            ],
                            [
                                "v62.0",
                                1.4
                            ],
                            [
                                "v61.0",
                                0.88
                            ],
                            [
                                "v60.0",
                                0.56
                            ],
                            [
                                "v59.0",
                                0.45
                            ],
                            [
                                "v58.0",
                                0.49
                            ],
                            [
                                "v57.0",
                                0.32
                            ],
                            [
                                "v56.0",
                                0.29
                            ],
                            [
                                "v55.0",
                                0.79
                            ],
                            [
                                "v54.0",
                                0.18
                            ],
                            [
                                "v51.0",
                                0.13
                            ],
                            [
                                "v49.0",
                                2.16
                            ],
                            [
                                "v48.0",
                                0.13
                            ],
                            [
                                "v47.0",
                                0.11
                            ],
                            [
                                "v43.0",
                                0.17
                            ],
                            [
                                "v29.0",
                                0.26
                            ]
                        ]
                    }
                ]
            }
        });
    } else if (data == 2) {
        this.chart = new Chart({
            chart: {
                renderTo: 'graficaLineal', 	// Le doy el nombre a la gráfica
                defaultSeriesType: 'line'	// Pongo que tipo de gráfica es

            },
            title: {
                text: 'Porcentaje de Visitas por Transsaciones'	// Titulo (Opcional)
            },
            // Pongo los datos en el eje de las 'X'
            xAxis: {
                categories: ['Ene', 'Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                // Pongo el título para el eje de las 'X'
                title: {
                    text: 'Meses'
                }
            },
            yAxis: {
                // Pongo el título para el eje de las 'Y'
                title: {
                    text: 'Promedios de servicios solicitados'
                }
            },
            // Doy formato al la "cajita" que sale al pasar el ratón por encima de la gráfica
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +' '+this.series.name;
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
                        name: 'Ventas',
                        data: [103,474,402,536,1041,270,0,160,2462,3797,3527,4505]
                    },
                    {
                        name: 'Compras',
                        data: [278,203,370,810,213,0,134,1991,3122,2870,3655,6400]
                    },
                    {
                        name: 'Alquileres',
                        data: [1064,1648,1040,1076,2012,397,0,325,3732,6067,5226,6482]
                    }],
        });
    }
}

}
