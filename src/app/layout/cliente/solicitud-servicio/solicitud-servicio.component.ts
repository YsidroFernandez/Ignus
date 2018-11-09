import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgModel, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-solicitud-servicio',
  templateUrl: './solicitud-servicio.component.html',
  styleUrls: ['./solicitud-servicio.component.scss']
})
export class SolicitudServicioComponent implements OnInit {
  solicitud2 = {
    tipo: "",
    descripcion: "",
    estado: "En espera",
    fecha: new Date(),
    fotos: [],
  }

  tipos = ["Compra", "Venta", "Alquiler", "Arrendamiento"]
  estados: string[] = ['En Proceso', 'En Espera', 'Procesado', 'Eliminado'];
  constructor() { 
    console.log("hola")
  }

  enviar() {


    var select = document.getElementById("tiposolicitud")
    var options = document.getElementsByTagName("option")

    // this.solicitud2.tipo = options[select.value-1].text
    // solicitud.push(this.solicitud2)
    alert("Agregado con exito")
    this.limpiar()
  }

  limpiar() {
    this.solicitud2 = {
      tipo: "",
      descripcion: "",
      estado: "En espera",
      fecha: new Date(),
      fotos: [],
    }
  }

  ngOnInit() { }

  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

}


