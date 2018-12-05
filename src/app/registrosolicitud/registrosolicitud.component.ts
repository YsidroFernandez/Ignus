import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud } from '../../environments/environment';
import { GlobalService } from '../providers/global.service';





@Component({
    selector: 'app-registrosolicitud',
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: []
})
export class RegistroSolicitudComponent implements OnInit {

    closeResult: string;
    solicitud: any;
    solicitudes: any;
    nuevo: any;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

  solicitud2= {
    cedula:"",
    correo: "",
    tipo: "" ,
    descripcion: "",
    estado: "En espera",
    fecha: "",
    fotos: [],
  }

tipos = ["Compra","Venta","Alquiler","Arrendamiento"]
estados: string[] = ['En Proceso', 'En Espera', 'Procesado', 'Eliminado'];

constructor(private modalService: NgbModal,public globalService: GlobalService) {
this.solicitud = [];
this.nuevo = [];
      }
// This method associate to New Button.
enviar() { 
  
  this.nuevo = JSON.stringify({correo: this.solicitud.email, tipo:this.solicitud.type, descripcion:this.solicitud.description, estado:this.solicitud.status, fecha:this.solicitud.date, fotos: this.solicitud.images });
   this.globalService.addModel(this.nuevo,"/api/requirement")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                        this.globalService.getModel("/api/requirement")
                            .then((result) => {
                                console.log(result);
                                this.solicitudes = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
  var select = document.getElementById("tiposolicitud");
  var options = document.getElementsByTagName("option");

 // this.solicitud2.tipo = options[select.value-1].text
//solicitud.push(this.solicitud2)
  alert("Agregado con exito")
  this.limpiar()
}

limpiar(){
  console.log(this.solicitud2)
  this.solicitud2= {
    cedula:"",
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
