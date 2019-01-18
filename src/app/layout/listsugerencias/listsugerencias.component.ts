import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { VERSION } from '@angular/common';
@Component({
  selector: 'app-listsugerencias',
  templateUrl: './listsugerencias.component.html',
  styleUrls: ['./listsugerencias.component.scss'],
  animations: [routerTransition()]
})
export class ListSugerenciasComponent implements OnInit {
  closeResult: string;
  listsugerencias: any;
  listsugerencia: any;
  new: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  modalIcon: string = 'fa fa-plus'
  modalName: any;
  modalTemplate: any;
  disabled: boolean;
  searchfilter: string;

  
  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      this.listsugerencias = [];
      this.listsugerencia = [];
      this.new = [];
      this.disabled = true;
   }


  open(content,action, index: number) {
    this.modalService.open(content).result.then((result) => {
      
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Update") {
            this.globalService.updateModel(this.listsugerencia.id, this.listsugerencia , "/api/contact/respond")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el promotion
                    this.globalService.getModel("/api/contact")
                        .then((result) => {
                            console.log(result);
                            this.listsugerencias = result['data'];
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

    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
 


    if (action == 'show') {//si la accion es ver, desabilita los campos del modal
        this.disabled = true;
        this.modalIcon = "fa fa-close"
    }
    else
        if (action == 'create') {//si la accion es distinta de ver los campos del modal quedaran activados
            this.disabled = false
            this.modalIcon = "fa fa-plus"
        } else
            if (action == 'Update') {//si la accion es distinta de ver los campos del modal quedaran activados
                this.disabled = false
                this.modalIcon = "fa fa-edit"
            }
    
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
    console.log("aqui va el loader");
}

ngOnInit() {
    this.show();   
   this.allContact();
}
faEdit = faEdit;


 allContact(){
    this.globalService.getModel("/api/contact")
    .then((result) => {
        console.log(result);
        this.listsugerencias = result['data'];
        console.log(this.listsugerencias);
    }, (err) => {
        console.log(err);
    });
 }


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.listsugerencia = Object.assign({}, this.listsugerencias[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.listsugerencia = Object.assign({}, this.listsugerencias[this.selectedRow]);
    this.showNew = true;



    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.listsugerencia.id, "/api/contact")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el promotion
                        this.globalService.getModel("/api/contact")
                            .then((result) => {
                                console.log(result);
                                this.listsugerencias = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }
    
                }, (err) => {
                    console.log(err);
                });
            } else {
                console.log('You clicked Cancel. You smart.');
            }
        });



}

// This method associate toCancel Button.
onCancel() {
    // Hide Usuario entry section.
    this.showNew = false;
}


}
