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
    
    values = ['circular', 'barra', 'lineal'];
    defaultValue = this.values[0];
    tipos: any =   [ {id:1, name: "circular"}, {id:2, name:"barra"}, {id:3, name:"lineal"}];
  
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

    buscar () 
    {
        
    // if(){

    // } else if()
    // {

    // }else if()
    // {

    // }

    

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
                ['Verificación de documento', 100],
                ['Evaluación estructural', 150],
                ['Acesoria', 1000],
                ['Ingreso por venta al cliente', 6500]
            ]
        }]
    });
}
}
