import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-reclamo',
    templateUrl: './reclamo.component.html',
    styleUrls: ['./reclamo.component.scss'],
    animations: [routerTransition()]

})
export class ReclamoComponent implements OnInit {
    selectedValue: string = "";
   
    // defaultValue = this.values[0];
    tipos = [ { value: "1", name: "Barra" }];
// { value: "1", name: "Circular" },
    public chart: any;
    constructor(

    ) {
        this.selectedValue = "0";
        let now = moment().format();
        console.log('hello world', this.tipos);
    }

    ngOnInit() {

    }


    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
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
                        ['Servicio de agua defectuoso', 100],
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
                    text: 'Reclamo mas frecuente'
                },               
                xAxis: {
                    categories: ['Ene', 'Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                    
                },
                yAxis: {
                    title: {
                        text: 'Reclamo mas frecuente'
                    }
            
                },
                legend: {
                    enabled: true
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
                        "name": "Reclamo",
                        // "colorByPoint": true,
                        "data": [
                            {
                                "name": "Daño en estructura ",
                                "y": 62.74,
                                "drilldown": "Daño en estructura"
                            },
                            {
                                "name": "Servicio de agua defectuoso ",
                                "y": 10.57,
                                "drilldown": "Servicio de agua defectuoso"
                            },
                            {
                                "name": "Sistema de luz en malas condiciones ",
                                "y": 80.52,
                                "drilldown": "Sistema de luz en malas condiciones"
                            },
                            {
                                "name": "Daño en estructura ",
                                "y": 60.80,
                                "drilldown": "Daño en estructura"
                            },
                            {
                                "name": "Servicio de agua defectuoso ",
                                "y": 4.02,
                                "drilldown": "Servicio de agua defectuoso"
                            },
                            {
                                "name": "Sistema de luz en malas condiciones ",
                                "y": 17.23,
                                "drilldown": "Sistema de luz en malas condiciones"
                            },
                            {
                                "name": "Sistema de luz en malas condiciones ",
                                "y": 40.52,
                                "drilldown": "Sistema de luz en malas condiciones"
                            }
                        ]
                    }
                ],
                "drilldown": {
                    "series": [
                        {
                            "name": "Servicio de agua defectuoso",
                            "id": "Servicio de agua defectuoso",
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