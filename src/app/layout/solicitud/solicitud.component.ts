import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../../environments/environment';
import { calendarFormat } from 'moment';
import { GlobalService } from '../../providers/global.service';

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
  solicitudes: any;
  solicitud: any;
  // It maintains recaudos form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(private modalService: NgbModal, public globalService: GlobalService) {
    this.solicitudes = [];
    this.solicitud = [];
  }
  

  solicitudapprove = {
    EmployeeId: "",
    title: "",
    start: new Date(),
    end: new Date(),
    color: colors.red,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
   }

  show() {
    console.log("aqui va el loader");
}

ngOnInit() {
    this.show();
    this.globalService.getModel("/api/request/pending")
        .then((result) => {
            console.log(result);
            this.solicitudes = result['data'];
            
        }, (err) => {
            console.log(err);
        });
}
// This method associate to Edit Button.
onEdit(index: number) {
 // Assign selected table row index.
 this.selectedRow = index;
 // Initiate new solicitud.
 
 // Retrieve selected solicitud from list and assign to model.
 this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
 console.log(this.solicitud)
 // Change submitType to Update.
 this.submitType = 'Actualizar';
 // Display solicitud entry section.
 this.showNew = true;
}

    // This method associate to Delete Button.
    onDelete(index: number) {
      console.log('eliminando');
      this.selectedRow = index;
      this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
      this.showNew = true;
      //Pendiente
      if(confirm('¿Estas seguro de eliminar este usuario?')){
          this.globalService.updateModel(this.solicitud.id,{message:"no a guta"},"/api/request/reject")
                  .then((result) => {
                      console.log(result);
                      if (result['status']) {
                        //this.solicitudes.splice(this.selectedRow, 1);                     
                      }

                  }, (err) => {
                      console.log(err);
                  });
          }
          this.solicitudes.splice(this.selectedRow, 1);
  }

      // This method associate toCancel Button.
      onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }


 open(content) {
     this.modalService.open(content).result.then((result) => {

     this.closeResult = `Closed with: ${result}`;
      if (this.submitType === 'save') {
   // Push solicitud model object into solicitud list.
   this.solicitudes.push(this.solicitud);
   console.log(this.submitType);
 } else {
   this.submitType = 'update';
   // Update the existing properties values based on model
   this.solicitudes[this.selectedRow].email = this.solicitud.email;
   this.solicitudes[this.selectedRow].type = this.solicitud.type;
   this.solicitudes[this.selectedRow].description = this.solicitud.description;
   this.solicitudes[this.selectedRow].state = this.solicitud.estate;
   this.solicitudes[this.selectedRow].date = this.solicitud.date;

   this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);

   console.log( this.solicitudes[this.selectedRow]);
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
    console.log(this.solicitudes[i-1])
    this.globalService.updateModel(this.solicitudes[i-1].id,{EmployeeId:1,date:"12/12/2018"}, "/api/request/pending/approve")
    .then((result) => {
        console.log(result);
        if (result['status']) {
            //Para que actualice la lista una vez que es eliminado la solicitud
                    console.log(result);
        }

    }, (err) => {
        console.log(err);
    });
   this.solicitudes.splice(i, 1);
   alert("aceptado y validada la cita")
 }


 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;
 faCheck =  faCheckCircle;
 faCancel = faTimesCircle;
 msg = '';
}