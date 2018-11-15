import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';


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
  modalService: any;
  closeResult: string;
  selectedReclamo: any;
  ReclamoArray: any;
  msg: string;

  constructor() { 
  console.log("hola")
}
open(content) {
  this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(this.selectedReclamo.id === 0){
  this.selectedReclamo.id = this.ReclamoArray.length + 1;
  this.ReclamoArray.push(this.selectedReclamo);
  this.msg = 'Campo Agregado Exitosamente';
  }
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  getDismissReason(reason: any): any {
    throw new Error("Method not implemented.");
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


