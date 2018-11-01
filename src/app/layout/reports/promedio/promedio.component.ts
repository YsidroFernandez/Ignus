import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

@Component({
    selector: 'app-promedio',
    templateUrl: './promedio.component.html',
    styleUrls: ['./promedio.component.scss'],
    animations: [routerTransition()]

})
export class PromedioComponent implements OnInit {

    public chart: any;
    constructor() {
        let now = moment().format();
        console.log('hello world', now);
    }

    ngOnInit() {

    }


    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    buscar() {

        this.chart = new Chart({
            chart: {
                renderTo: 'graficaCircular',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Promedio de compra de inmueble por promociones'
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
                    ['Terreno', 870300],
                    ['Apartamento', 1200500],
                    ['Vivienda multifamiliar', 10407090],
                    ['Quitan', 234500],
                    ['Mansión', 6034000]
                    
                ]
            }]
        });
    }
}
