import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

	reclamos2 = {
    tipo: "",
    descripcion: "",
    estado: "En espera",
    tiporeclamo: "",
  }

  tiporeclamo = ["Servicio de agua defectuoso", "Daño en estructura", "Sistema de luz en malas condiciones"]
  estados: string[] = ['En Proceso', 'En Espera', 'Procesado', 'Eliminado'];

  constructor() { 
  console.log("hola")
}

 enviar() {


    var select = document.getElementById("tiporeclamo")
    var options = document.getElementsByTagName("option")

    
    alert("Enviado con exito")
    this.limpiar()
  }

  limpiar() {
    this.reclamos2 = {
    
    tipo: "",
    descripcion: "",
    estado: "En espera",
    tiporeclamo: "",
    }
  }

  ngOnInit() {
 
  }

}


