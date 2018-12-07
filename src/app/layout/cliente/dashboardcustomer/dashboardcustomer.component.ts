import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboardcustomer',
  templateUrl: './dashboardcustomer.component.html',
  styleUrls: ['./dashboardcustomer.component.scss']
})
export class DashboardcustomerComponent implements OnInit {

  public listSeguimiento:any;
  public listSolicitudes:any;
  constructor() { }

  ngOnInit() {
    this.listSeguimiento=[
      { nro: '12345', descripcion: 'Compra de Casa en el Este de Barqto', estatus:'	Esperando Recaudos'},
      { nro: '54545', descripcion: 'Alquiler de apartamento', estatus: 'Reserva realizada' }

    ];
    this.listSolicitudes=[
      {tipo: "Alquiler", descripcion: "Casa grande con todos los servicios", estado: "En Espera",fecha: "11/10/2018", fotos: []},
      {tipo: "Compra", descripcion: "Deseo una casa grande", estado: "En Proceso",fecha: "16/11/2018", fotos: []},
      {tipo: "Venta", descripcion: "Apartamento acogedor con 3 cuartos", estado: "En espera",fecha: "24/09/2018", fotos: []},
      {tipo: "Arrendamiento", descripcion: "Quinta con 5 cuartos y un baño", estado: "En espera",fecha: "24/09/2018 ", fotos: []},
      {tipo: "Compra", descripcion: "Apartemento en el centro de la ciudad", estado: "En Revision",fecha: "24/09/2018 ", fotos: []},
      {tipo: "Compra", descripcion: "casa 2 plantas con garage", estado: "En Revision",fecha: "24/09/2018 ", fotos: []}
    ]
  }
  faEye = faEye;

}
