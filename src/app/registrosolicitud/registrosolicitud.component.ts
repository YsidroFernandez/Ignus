import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud } from '../../environments/environment';





@Component({
    selector: 'app-registrosolicitud',
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: []
})
export class RegistroSolicitudComponent implements OnInit {

  solicitud2= {
    correo: "",
    tipo: "" ,
    descripcion: "",
    estado: "En espera",
    fecha: "",
    fotos: [],
  }

  tipos = ["Compra","Venta","Alquiler","Arrendamiento"]
estados: string[] = ['En Proceso', 'En Espera', 'Procesado', 'Eliminado'];

constructor(private modalService: NgbModal) {

      }
// This method associate to New Button.
enviar() { 
  
  
  var select = document.getElementById("tiposolicitud");
  var options = document.getElementsByTagName("option");

 // this.solicitud2.tipo = options[select.value-1].text
  solicitud.push(this.solicitud2)
  alert("Agregado con exito")
  this.limpiar()
}

limpiar(){
  this.solicitud2= {
    correo: "",
    tipo: "" ,
    descripcion: "",
    estado: "En espera",
    fecha: "",
    fotos: [],
  }
}

 ngOnInit() {}

 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;

}
