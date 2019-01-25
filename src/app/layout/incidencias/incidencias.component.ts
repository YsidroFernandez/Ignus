import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { GlobalsProvider } from '../../shared';
@Component({
  selector: 'app-activities',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss'],
  animations: [routerTransition()],
  providers: [GlobalsProvider],
})
export class IncidenciasComponent implements OnInit {
  closeResult: string;
  incidencias: any;
  incidencia: any;
  tipoincidencias: any;
  tipoincidencia: any;
  transaccion: any = {id: '',nameForEmployee: ''};
  transacciones: any;
  modalTitle: string = 'Incidencia';
  modalIcon: string = 'fa fa-plus'
  modalName: any;
  modalTemplate: any;
  showView:Boolean = false;
  submitType: string = 'Save';
  disabled: boolean;
  searchfilter: string;
  user: any;

  faEdit = faEdit;
  new: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false; 
  public numPage: number;
  public pages = 1;
  selectedRow: number;
  
  constructor(
    private modalService: NgbModal,
     public globalService: GlobalService,
     private globals: GlobalsProvider,
      private coolDialogs: NgxCoolDialogsService) {
      this.incidencias = [];
      this.incidencia = {};
      this.tipoincidencias = [];
      this.tipoincidencia = [];
      this.user = JSON.parse(localStorage.user).id;

      this.new = {};
   }
   getTransacciones(){
    this.globalService.getModel_Id(this.user, '/api/client/transaction')
      .then((result) => {
        this.transacciones = [];
        this.transacciones = result['data'];
        console.log(this.transacciones);
      }, (err) => {
        console.log(err);
        // this.loader.dismiss();
      });


}

 getIncidence(){
    this.globalService.getModel("/api/incidence?userId="+this.user)
    .then((result) => {
        console.log(result);
        this.incidencias = result['data'];
    }, (err) => {
        console.log(err);
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


   ngOnInit() { 
    this.numPage = this.globals.numPage;
    this.getIncidence();
    this.getIncidencias();
    this.getTransacciones();
 }

apiAction() { //metodo para realizar una accion ya sea crear, editar

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({name: this.incidencia.name, description: this.incidencia.description, TransactionId: this.incidencia.TransactionId, TypeIncidenceId: this.incidencia.TypeIncidenceId});
    if (this.submitType === "create") {
        console.log(this.new);
        //metodo que perimite enviar por post un nuevo empleado
        this.globalService.addModel(this.new, "/api/incidence")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el empleado
                    this.getIncidence();
                }

            }, (err) => {
                console.log(err);
            });


    } else {
        //metodo que perimite enviar por put una actualizaciòn de un servicio
        this.globalService.updateModel(this.incidencia.id, this.new, "/api/incidence")
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                    this.getIncidence();
                }

            }, (err) => {
                console.log(err);
            });
    }
}

//solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear 
open(content, action, index: number) {
    //==============================================================================
    //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
    //por ejemplo en los botones del modal que  ejecutan la funcion C() cierra el modal y se termina de cumplir la promesa
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //==============================================================================
    console.log(action)
    
    this.disabled=false;
    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action;    // variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index;    //aca se toma el indice de el servicio seleccionado
    this.incidencia = Object.assign({}, this.incidencias[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico
    console.log(this.incidencia)

    if (action == 'show') {//si la accion es ver, desabilita los campos del modal
        this.disabled = true;
        this.showView = false;
        this.modalIcon = "fa fa-close"



    }
    else
        if (action == 'create') {//si la accion es distinta de ver los campos del modal quedaran activados
            this.disabled = false;
            this.showView = true;
            this.modalIcon = "fa fa-plus"
        } else
            if (action == 'edit') {//si la accion es distinta de ver los campos del modal quedaran activados
                this.disabled = false;
                this.modalIcon = "fa fa-edit";
                this.showView = false;
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


// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.incidencia = Object.assign({}, this.incidencias[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar esta incidencia?')){
        this.globalService.removeModel(this.incidencia.id, "/api/incidence")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la promotion
                        this.globalService.getModel("/api/incidence")
                            .then((result) => {
                                console.log(result);
                                this.incidencias = result['data'];
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

    


}
