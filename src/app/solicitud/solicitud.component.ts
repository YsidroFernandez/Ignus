import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud, actions, calendariocita, colors } from '../../environments/environment';
import { calendarFormat } from 'moment';
import { GlobalService } from '../providers/global.service';

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
  
  show() {
    console.log("aqui va el loaer");
}

ngOnInit() {
    this.show();
    this.globalService.getModel("/api/")
        .then((result) => {
            console.log(result);
            this.solicitudes = result['data'];
            console.log(this.solicitudes);
        }, (err) => {
            console.log(err);
        });
}

    // This method associate to Delete Button.
    onDelete(index: number) {
      console.log('eliminando');
      this.selectedRow = index;
      this.solicitud = Object.assign({}, this.solicitudes[this.selectedRow]);
      this.showNew = true;
      //Pendiente
      if(confirm('¿Estas seguro de eliminar este usuario?')){
          this.globalService.removeModel(this.solicitud.id, "/api/")
                  .then((result) => {
                      console.log(result);
                      if (result['status']) {
                          //Para que actualice la lista una vez que es eliminado la solicitud
                          this.globalService.getModel("/api/")
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
          }


  }

      // This method associate toCancel Button.
      onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }

 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;
 faCheck =  faCheckCircle;
 faCancel = faTimesCircle;
 msg = '';
}