import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { GlobalService } from "../../providers/global.service";
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  animations: [routerTransition()],
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  closeResult: string;
  customers: any;
  client: any;
  new: any;
  states: any;
  municipalities: any;
  parishes: any;
  faEdit = faEdit;
  modalTitle: string = "Cliente";
  modalIcon: string = "fa fa-close";
  modalName: any;
  modalTemplate: any;
  // It maintains customers form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = "Save";
  selectedRow: number;
  disabled: boolean;
  data = {
    state: "",
    municipality: "",
    parish: ""
  };
  ngxValue: any = [];
    ngxDisabled = false;
    ngxStates: any = [];
    gender = [
      {id: 1, name: 'Masculino'},
      {id: 2, name: 'Femenino'}  ];
   
  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.customers = [];
    this.client = [];
    this.new = [];
    this.states = [];
    this.municipalities = [];
    this.parishes = [];
    this.disabled = true;
   
  }

  loadListClient() {
    this.globalService.getModel("/api/client").then(
      result => {
        console.log(result);
        this.customers = result["data"];
        console.log(this.customers);
      },
      err => {
        console.log(err);
      }
    );
  }

  loadStates() {
    this.globalService.getModel(`/api/state/`).then(
      result => {
        if (result["status"]) {
          this.states = result["data"];
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  //this method associate to reload states
  loadmunicipality(state) {
    this.municipalities = [];
    this.parishes = [];
    this.globalService.getModel(`/api/state/municipality/${state}`).then(
      result => {
        if (result["status"]) {
          this.municipalities = result["data"];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  loadparish(municipality) {
    console.log("muni ", municipality);
    this.globalService.getModel(`/api/municipality/parish/${municipality}`)
      .then(
        result => {
          if (result["status"]) {
            this.parishes = result["data"];
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  apiAction() {
    //metodo para realizar una accion ya sea crear, editar
      //declaracion que permite enviar el nuevo json ya sea para crear o editar
      // this.new = JSON.stringify({ birthDate:this.client.birthDate, firstName: this.client.name, lastName: this.client.lastName, bankName: this.client.bankName, bankAccount: this.client.bankAccount, gender:this.client.gender ,states: this.ngxStates });
    console.log(this.client.userId);
    this.globalService.updateModel(this.client.userId, this.client, "/api/client")
      .then(
        result => {
          if (result["status"]) {
            //Para que actualice la lista una vez que es editado el client
            this.loadListClient();
          }
        },
        err => {
          console.log(err);
        }
      );
    
  }

  open(content, action, index: number) {
    //==============================================================================
    //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
    //por ejemplo en los botones que se ejecuta la funcion C() se cierra el modal y se termina de cumplir la promesa
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    //==============================================================================
    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action; // variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
    this.client = Object.assign({}, this.customers[this.selectedRow]); //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico
      console.log(this.submitType);
      
    if (action == 'show') {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
      this.modalIcon = "fa fa-close";
      this.modalTitle="Ver Cliente";
      
    } else if (action == 'edit') {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalTitle="Editar Cliente";
      this.modalIcon = "fa fa-edit";
    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.loadListClient();
    this.loadStates();
  }
  
  // This method associate to Delete Button.
  onDelete(index: number) {
    console.log("eliminando");
    this.selectedRow = index;
    this.client = Object.assign({}, this.customers[this.selectedRow]);
    this.showNew = true;
    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples y elegantes 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.client.userId, "/api/client").then(
                    result => {
                      console.log(result);
                      if (result["status"]) {
                        //Para que actualice la lista una vez que es eliminado la client
                        this.loadListClient();
                      }
                    },
                    err => {
                      console.log(err);
                    }
                  );
            } else {
                console.log('You clicked Cancel. You smart.');
            }
        });
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide client entry section.
    this.showNew = false;
  }
}
