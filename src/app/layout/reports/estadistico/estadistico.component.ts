import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

@Component({
    selector: 'app-estadistico',
    templateUrl: './estadistico.component.html',
    styleUrls: ['./estadistico.component.scss'],
    animations: [routerTransition()]
    
})
export class EstadisticoComponent implements OnInit {
    
    public report = '';
    tipos: any =   [
        {
        id:1,
        name: "circular"
        },
        {
        id:2,
        name:"barra"
        },
        {
        id:3,
        name:"lineal"
        }        
    ];
    constructor() {
        let now = moment().format(); 
    console.log('hello world', this.tipos);
     }

    ngOnInit() {
        
     }
   

    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    buscar (data) 
    {
        console.log(data);
    }

    

    chart = new Chart({
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
        // subtitle: {
            // text: ''		// Subtitulo (Opcional)
        // },
        // plotArea: {
        // 	shadow: null,
        // 	borderWidth: null,
        // 	backgroundColor: null
        // },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
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
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                    },
                }, showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['España', 35.38],
                ['México', 21.0],
                ['Colombia', 9.45],
                ['Perú', 5.74],
                ['Argentina', 5.14],
                ['Chile', 4.89],
                ['Venezuela', 3.04],
                ['Ecuador', 2.53],
                ['Bolivia', 1.66],
                ['Rep. Dominicana', 1.12],
                ['Guatemala', 1.08],
                ['Costa Rica', 1.07],
                ['Estados Unidos', 1.03],
                ['+81 paises', 6.87]
            ]
        }]
    });
}
