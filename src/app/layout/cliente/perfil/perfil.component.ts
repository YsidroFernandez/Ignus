import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  //animations: [routerTransition()],
  styleUrls: ['./perfil.component.scss'],
})

export class PerfilComponent implements OnInit {
    closeResult: string;
    perfil: any;
    
    nuevo: any;
    showNew: Boolean = false;

    submitType: string = 'Save';
    selectedRow: number;

  constructor(private modalService: NgbModal, public globalService: GlobalService) { 
  this.perfil = [];
  this.nuevo = [];
  }

    //Metodo del boton Enviar
  enviar() { 
  if (this.submitType === "Save") {
  this.nuevo = JSON.stringify({firstName: this.perfil.firstName, lastName: this.perfil.lastName, birthDate: this.perfil.birthDate, gender: this.perfil.gender, });
   this.globalService.addModel(this.nuevo,"/api/client")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.perfil = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
           }else{
                this.globalService.updateModel(this.perfil.id, this.perfil, "/api/client")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el perfil
                            this.globalService.getModel("/api/client")
                                .then((result) => {
                                    console.log(result);
                                    this.perfil = result['data'];
                                }, (err) => {
                                    console.log(err);
                                });
                        }

                    }, (err) => {
                        console.log(err);
                    });

            }

  alert("Agregado con exito")
  this.showNew = false;
}

      private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
          }

          show() {
        console.log("aqui va el loaer");
    }

  ngOnInit() {

        this.show();
        this.globalService.getModel("/api/client")
            .then((result) => {
                console.log(result);
                this.perfil = result['data'];
                console.log(this.perfil);
            }, (err) => {
                console.log(err);
            });
  } faEdit = faEdit;

  onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.perfil = Object.assign({}, this.perfil[this.selectedRow]);
        this.showNew = true;
    }

    onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }

}
