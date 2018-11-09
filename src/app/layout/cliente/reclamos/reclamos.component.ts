import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

	reclamos = {
	  tipos: "";
    tiporeclamo: "",
    descripcion: "",
    estado: "En espera",
    fotos: [],
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
    this.reclamos = {
      tiporeclamo: "",
      descripcion: "",
      estado: "En espera",
      fotos: [],
    }
  }

  ngOnInit() {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

 
  }

}


