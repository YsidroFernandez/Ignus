import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { VERSION } from '@angular/common';
@Component({
  selector: 'app-listincidences',
  templateUrl: './listincidences.component.html',
  styleUrls: ['./listincidences.component.scss'],
  animations: [routerTransition()]
})
export class ListIncidencesComponent implements OnInit {
  closeResult: string;
  searchfilter: string;
  listincidences: any;
  listincidence: any;
  respuesta: any = 'Atendida';
  new: any;
  transaccion: any = {id: '',nameForEmployee: ''};
  transacciones: any;
  tipoincidencias: any;
  tipoincidencia: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  modalIcon: string = 'fa fa-plus'
  modalName: any;
  modalTemplate: any;
  disabled: boolean;
  aceptar: any = true;
  denegar: any = false;
  user: any;

  
  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      this.listincidences = [];
      this.listincidence = {
        date: '',
        description: '',
        id: 0,
        name: '',
        transaction: {client: {}},
        typeIncidence: {}
      };
      this.new = [];
      this.user = JSON.parse(localStorage.user).id;
      this.tipoincidencias = [];
      this.tipoincidencia = [];

   }

   getTransacciones(){
    this.globalService.getModel_Id(this.user, '/api/employee/transaction')
      .then((result) => {
        this.transacciones = [];
        this.transacciones = result['data'];
        console.log(this.transacciones);
      }, (err) => {
        console.log(err);
        // this.loader.dismiss();
      });
}

getIncidencias() {
    this.globalService.getModel("/api/typeIncidence")
    .then((result) => {
        this.tipoincidencias = result['data'];
    }, (err) => {
        console.log(err);
    });

}

   cambiardenegar(){
       if(this.aceptar = true) {
            this.denegar = false;
       }else{
        this.denegar = true;
       }
    }
    
    cambiaraceptar(){
        if(this.denegar = true) {
            this.aceptar = false;
       }else{
        this.aceptar = true;
       }
    }

    limpiar(){
        this.listincidence = {
        name: ' ',
        description: ' ',
        transaction: {client: {}},
        typeIncidence: {}
        }
        }


  open(content,action, index: number) {
    this.modalService.open(content).result.then((result) => {
        if(this.aceptar){
            this.listincidence.decision = true;
            }else{
            this.listincidence.decision = false;
            }
        this.closeResult = `Closed with: ${result}`;
        this.new = JSON.stringify({name: this.listincidence.name, description: this.listincidence.description, TransactionId: this.listincidence.TransactionId, TypeIncidenceId: this.listincidence.TypeIncidenceId});
        if (this.submitType === "create") {
            console.log(this.new);
            //metodo que perimite enviar por post un nuevo empleado
            this.globalService.addModel(this.new, "/api/incidence")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el empleado
                        this.allIncidence();
                    }
    
                }, (err) => {
                    console.log(err);
                });
        }else {
            this.globalService.updateModel(this.listincidence.id, this.listincidence, "/api/incidence/respond")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el promotion
                    this.globalService.getModel("/api/incidence")
                        .then((result) => {
                            console.log(result);
                            this.listincidences = result['data'];
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
   this.allIncidence();
   this.getTransacciones();
   this.getIncidencias();
}
faEdit = faEdit;


 allIncidence(){
    this.globalService.getModel("/api/incidence")
    .then((result) => {
        console.log(result);
        this.listincidences = result['data'];
        console.log(this.listincidences);
    }, (err) => {
        console.log(err);
    });
 }


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.listincidence = Object.assign({}, this.listincidences[this.selectedRow]);

    this.showNew = true;
}

onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.listincidence = Object.assign({}, this.listincidences[this.selectedRow]);
    this.showNew = true;
    
    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.listincidence.id, "/api/incidence")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.allIncidence();
                        }

                    }, (err) => {
                        console.log(err);
                    });
            } else {
                console.log('You clicked Cancel. You smart.');
            }
        });
}
// This method associate to Delete Button.

// This method associate toCancel Button.
onCancel() {
    // Hide Usuario entry section.
    this.showNew = false;
}


}