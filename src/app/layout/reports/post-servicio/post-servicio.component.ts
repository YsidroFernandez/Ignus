import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { GlobalService } from '../../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as querystring from 'querystring';
import { GlobalsProvider } from '../../../shared';
import  * as $ from 'jquery';


@Component({
    selector: 'app-post-servicio',
    templateUrl: './post-servicio.component.html',
    styleUrls: ['./post-servicio.component.scss'],
    animations: [routerTransition()],
    providers: [GlobalsProvider]

})
export class PostServicioComponent implements OnInit {
    public numPage: number;
    public pages = 1;
    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];
    public states = [];
    public municipalities = [];
    public parishes = [];
    imagen: any;
    agencia: any;
    img1: any;
    jQuery: any;
    pageHeight: number
    agencias: any;
    public view = false;
    public solicitud: any = {
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
    public datos: any = [
        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },        {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
    {
        nombre: 'Jorge',
        apellido: 'Chiquin',
        sexo: 'Masculino',
        fecha: '03-Mayo-2018'
    },
];
    public chart: any;
    logoURL: string = ""
    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService,private globals: GlobalsProvider) {
        let now = moment().format();
        console.log('hello world', this.tipos);     
    }

    ngOnInit() {
        this.allStates();
        this.allAgency();
        this.getLogo();
        this.numPage = this.globals.numPage; 
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
        this.convertImgToBase64URL(this.logoURL, (base64Img) =>{
            this.imagen = base64Img; // myBase64 is the base64 string
        var data = document.getElementById('content');

        html2canvas(data).then(canvas => {
          // Few necessary setting options
         // var imgWidth = 220;
          //var pageHeight = 300;
          var doc = new jspdf('p', 'mm')
          var imgWidth = doc.internal.pageSize.getWidth(); 
          var pageHeight = doc.internal.pageSize.getHeight();
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
          doc.text(55, 60, 'Reporte Estructurado')
         // doc.addImage("data:image/jpeg;base64,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",'PNG', 9,3,32,30)
          //doc.addImage("data:image/jpeg;base64,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",'PNG', 169,3,32,30)
          doc.addImage(this.imagen, 'PNG', 10,8,20,20)
          doc.addImage(this.imagen, 'PNG', 180,8,20,20)
          var imgData = canvas.toDataURL('image/png');

          /*
          Here are the numbers (paper width and height) that I found to work. 
          It still creates a little overlap part between the pages, but good enough for me.
          if you can find an official number from jsPDF, use them.
          */

         this.jQuery('#p').html2canvas({
            onrendered: function( canvas ) {
                 this.img1 = canvas.toDataURL('image/png');
            }
        });
        doc.addPage();
        doc.addImage( this.img1, 'PNG', 0, 0, 210, 297);
        //   heightLeft -= (pageHeight);

    
        //   while (heightLeft >= 0) {
        //     position = (heightLeft - imgHeight);
        //     doc.addPage();
        //     doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        //     heightLeft -= pageHeight;
        //   }
        //   doc.setFontSize(10)
        //   doc.text(78, pageHeight+10 , 'SubTotal:'+" "+'25')
        //   doc.setFontSize(10)
        //   doc.text(78, pageHeight+15 , 'Total:'+" "+'50')
          
 
          doc.save("Reporte-Clientes.pdf") 
        });
        });


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

        getLogo(){
            this.globalService.getModel("/api/agency/logo")
            .then((result) => {
                console.log(result);
                this.logoURL = result['data']['url'];
            }, (err) => {
                console.log(err);
            });
        }


    allStates() {
        this.globalService.getModel(`/api/state/`).then((result) => {
            if (result['status']) {
                this.states = [];
                this.states = result['data'];
            }
        }, (err) => {
            console.log(err);
        });
    }

    loadmunicipality(state) {
        this.municipalities = [];
        this.parishes = [];

        this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.municipalities = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadparish(municipality) {
        this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.parishes = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }



    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }
    prueba(){
        this.view = true;
    }
    buscar(data) {
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
                                "name": "Venta ",
                                "y": 10.57,
                                "drilldown": "Venta"
                            },
                            {
                                "name": "Venta ",
                                "y": 7.23,
                                "drilldown": "Venta"
                            },
                            {
                                "name": "Venta ",
                                "y": 5.58,
                                "drilldown": "Venta"
                            },
                            {
                                "name": "Venta ",
                                "y": 4.02,
                                "drilldown": "Venta"
                            },
                            {
                                "name": "Venta ",
                                "y": 1.92,
                                "drilldown": "Opera"
                            },
                            {
                                "name": "Venta ",
                                "y": 7.62,
                                "drilldown": "Venta"
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
