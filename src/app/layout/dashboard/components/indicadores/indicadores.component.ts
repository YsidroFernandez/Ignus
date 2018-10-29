import { Component, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';
// import { routerTransition } from '../../../../router.animations';


@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // lineChart Transacciones Mensaules
  public lineChartData: Array<any> = [
    { data: ['Ventas', 5, 10, 8, 1, 6, 5, 4, 12, 10, 3, 7, 5], label: 'Ventas de Inmuebles' },
    { data: ['Alquiler', 2, 8, 3, 1, 6, 2, 0, 3, 5, 12, 10, 8], label: 'Alquiler de Inmuebles' },
    { data: ['Compras', 1, 4, 7, 9, 10, 7, 4, 5, 2, 12, 9, 10], label: 'Compras de Inmueble' }
  ];

  public lineChartLabels: Array<any> = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(27, 222, 16,0.2)',
      borderColor: 'rgba(27, 222, 16, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(21, 157, 154, 0.4) ',
      borderColor: 'rgba(21, 91, 157)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(225, 9, 12, 0.36)',
      borderColor: 'rgba(225, 9, 12, 0.96)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }





  // Gráficos dinámicos de los ingresos por Transacciones

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65000000, 59000000, 8000000, 810000000, 5600000, 55000000, 40000000, 7690000, 650999900, 12000000, 2340000000, 3650000000], label: 'Casas' },
    { data: [83000000, 32000000, 19000000, 20000000, 8700000, 99000000, 100000000, 7960000, 60999900, 859000000, 9870000000, 320000000], label: 'Apartamentos' },
    { data: [28819900, 48000909, 4009000, 19000000, 8633000, 2700001, 90900000, 7650000, 429870000, 54398000, 42300000, 87600000], label: 'Edificios' }
  ];

  // events
  public click(e: any): void {
    console.log(e);
  }

  public hovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
 
  }



  public pieChartType: string = 'pie';

  // Pie
  public pieChartLabels: string[] = ['Edificios', 'Apartamentos', 'Casas', 'Terrenos'];
  public pieChartData: number[] = [300, 500, 100, 20];

  public randomizeType(): void {
    this.barChartType = this.barChartType === 'bar' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }


}
