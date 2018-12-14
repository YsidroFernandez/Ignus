import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-cita',
    templateUrl: './cita.component.html',
    styleUrls: ['./cita.component.scss'],
    animations: [routerTransition()]

})
export class CitaComponent implements OnInit {

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
    buscar() {

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
