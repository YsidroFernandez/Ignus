import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    styleUrls: ['./solicitudes.component.scss'],
    animations: [routerTransition()]

})
export class SolicitudesComponent implements OnInit {

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
                text: 'Calificación de Empleado'	// Titulo (Opcional)
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
                    text: 'Promedios de solicitudes'
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
                name: 'Rechadas',
                data: [3103, 5474, 7402, 9536, 1041, 3270, 4676, 7160, 2462, 3797, 3527, 4505]
            },
            {
                name: 'Aceptadas',
                data: [278, 4203, 1370, 810, 6213, 3787, 8134, 1991, 3122, 2870, 3655, 6400]
            }],
        });
    }
}

