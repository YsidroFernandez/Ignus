import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

@Component({
    selector: 'app-post-servicio',
    templateUrl: './post-servicio.component.html',
    styleUrls: ['./post-servicio.component.scss'],
    animations: [routerTransition()]

})
export class PostServicioComponent implements OnInit {

    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];

    public chart: any;
    constructor() {
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
