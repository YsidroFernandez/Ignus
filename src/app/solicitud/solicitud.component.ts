import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../environments/environment';
import { calendarFormat } from 'moment';

import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,DAYS_OF_WEEK
} from 'angular-calendar';





@Component({
    selector: 'app-solicitud',
    templateUrl: './solicitud.component.html',
    styleUrls: ['./solicitud.component.scss'],
    providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class SolicitudComponent implements OnInit {
  closeResult: string;
  
  solicitud2= {
    correo: "",
    tipo: "" ,
    descripcion: "",
    estado: "En espera",
    fecha: "",
    fotos: [],
  }

  nuevacita = {
    title: "",
    start: new Date(),
    end: new Date(),
    color: colors.red,
    actions: actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true,
    email: "",
    agent: ""
   }
  // It maintains list of solicituds
solicituds= [];
// It maintains solicitud Model

// It maintains solicitud form display status. By default it will be false.
showNew: Boolean = false;
// It will be either 'Save' or 'Update' based on operation.
submitType: string = 'Guardar';
// It maintains table row index based on selection.
selectedRow: number;

tipos: string[] = ['Compra', 'Venta', 'Alquiler', 'Arrendamiento'];
// It maintains Array of countries.
estados: string[] = ['En Proceso', 'En Espera', 'Procesado', 'Eliminado'];

constructor(private modalService: NgbModal) {
 // Add default solicitud data.
/*
 solicitud.correo = 'peleal@gmail.com';
 solicitud.tipo = "Alquiler"
 solicitud.descripcion = "Casa grande con todos los servicios"
 solicitud.estado = "En Espera"
 this.solicituds.push(solicitud)
 
 this.solicituds.push(solicitud= {
  correo: "jelias@gmail.com",
  tipo: 'Compra' ,
  descripcion: "Deseo una casa grande",
  estado: 'En Proceso'})
 
  this.solicituds.push(solicitud= {
    correo: "jfalcon@gmail.com",
    tipo: 'Venta' ,
    descripcion: 'Apartamento acogedor con 3 cuartos',
    estado: 'En espera'})
   
    this.solicituds.push(solicitud= {
      correo: "Yfernandez@gmail.com",
      tipo: 'Arrendamiento' ,
      descripcion: 'Quinta con 5 cuartos y un baño',
      estado: 'En espera'})
  
      this.solicituds.push(solicitud= {
        correo: "wquerales@gmail.com",
        tipo: 'Compra' ,
        descripcion: 'Apartemento en el centro de la ciudad',
        estado: 'En Revision'})
    

      this.solicituds.push(solicitud= {
        correo: "eperez@gmail.com",
        tipo: 'Compra' ,
        descripcion: 'casa 2 plantas con garage',
        estado: 'En Revision'})
        */
       this.solicituds = solicitud
      }
// This method associate to New Button.
onNew() {
 // Initiate new solicitud.

 // Change submitType to 'Save'.
 this.submitType = 'Guardar';
 // display solicitud entry section.
 this.showNew = true;
}


// This method associate to Edit Button.
onEdit(index: number) {
 // Assign selected table row index.
 this.selectedRow = index;
 // Initiate new solicitud.
 
 // Retrieve selected solicitud from list and assign to model.
 this.solicitud2 = Object.assign({}, this.solicituds[this.selectedRow]);
 console.log(this.solicitud2)
 // Change submitType to Update.
 this.submitType = 'Actualizar';
 // Display solicitud entry section.
 this.showNew = true;
}

// This method associate to Delete Button.
delete(index: number) {
 // Delete the corresponding solicitud entry from the list.
 if(confirm('¿Estas seguro de eliminar este solicitud?')){
 this.solicituds.splice(index, 1);
 }
}

// This method associate toCancel Button.
onCancel() {
 // Hide solicitud entry section.
 this.showNew = false;
}

// This method associate to Bootstrap dropdown selection change.
onChangeEstado(estado: string) {
 // Assign corresponding selected estado to model.
 this.solicitud2.estado = estado;
}

onChangetipo(tipo: string) {
  // Assign corresponding selected estado to model.
  this.solicitud2.tipo = tipo;
 }

 onChangefecha(fechac) {
  // Assign corresponding selected estado to model.
  this.solicitud2.fecha = fechac;
 }

 open(content) {
     this.modalService.open(content).result.then((result) => {

     this.closeResult = `Closed with: ${result}`;
      if (this.submitType === 'Guardar') {
   // Push solicitud model object into solicitud list.
   this.solicituds.push(this.solicitud2);
   console.log(this.submitType);
 } else {
   this.submitType = 'Actualizar';
   // Update the existing properties values based on model
   this.solicituds[this.selectedRow].correo = this.solicitud2.correo;
   this.solicituds[this.selectedRow].tipo = this.solicitud2.tipo;
   this.solicituds[this.selectedRow].descripcion = this.solicitud2.descripcion;
   this.solicituds[this.selectedRow].estado = this.solicitud2.estado;
   this.solicituds[this.selectedRow].fecha = this.solicitud2.fecha;

   this.solicitud2 = Object.assign({}, this.solicituds[this.selectedRow]);

   console.log( this.solicituds[this.selectedRow]);
   console.log(this.submitType);
 }
 // Hide solicitud entry section.
 this.showNew = false;
     }
     , (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
 }

 private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
         return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
         return 'by clicking on a backdrop';
     } else {
         return  `with: ${reason}`;
     }
 }


 aceptar(i){
   calendariocita.push(this.nuevacita)

   this.solicituds.splice(i, 1);
   alert("aceptado y validada la cita")
 }

 ngOnInit() {}

 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;
 faCheck =  faCheckCircle;
 faCancel = faTimesCircle;
}
