import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  //animations: [routerTransition()],
  styleUrls: ['./sugerencias.component.scss']
})

export class SugerenciasComponent implements OnInit {
	
  constructor() {
        //this.sugerencias = [];
        //this.sugerencia = [];
        //this.nuevo = [];
  }

   /* open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.nuevo = JSON.stringify({cedula: this.sugerencia.cedula , email: this.sugerencia.email description:this.sugerencia.description});
                this.globalService.addModel(this.nuevo,"/api/requirement")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                        this.globalService.getModel("/api/requirement")
                            .then((result) => {
                                console.log(result);
                                this.sugerencias = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
            }else{
                this.globalService.updateModel(this.sugerencia.id, this.su, "/api/requirement")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el recaudo
                            this.globalService.getModel("/api/requirement")
                                .then((result) => {
                                    console.log(result);
                                    this.sugerencias = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });

            }
            // Hide Usuario entry section.
            this.showNew = false;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } */ 



  ngOnInit() {
  }

}
