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
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  animations: [routerTransition()],
  styleUrls: ["./collection.component.scss"]
})
export class CollectionComponent implements OnInit {
  closeResult: string;
  collections: any;
  collection: any;
  new: any;
  faEdit = faEdit;
  modalTitle: string = "Recaudo";
  modalIcon: string = "fa fa-plus";
  modalName: any;
  modalTemplate: any;
  submitType: string = "Save";
  disabled: boolean;
  // It maintains collections form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  selectedRow: number;

  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService,
    private coolDialogs: NgxCoolDialogsService
  ) {
    this.collections = [];
    this.collection = [];
    this.new = [];
  }

  getListCollections() {
    this.globalService.getModel("/api/requirement").then(
      result => {
        console.log(result);
        this.collections = result["data"];
        console.log(this.collections);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getListCollections();
  }

  apiAction() {
    //metodo para realizar una accion ya sea crear, editar

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({
      name: this.collection.name,
      description: this.collection.description
    });
    if (this.submitType === "create") {
      console.log(this.new);
      //metodo que perimite enviar por post un nuevo empleado
      this.globalService.addModel(this.new, "/api/requirement").then(
        result => {
          console.log(result);
          if (result["status"]) {
            //Para que actualice la lista una vez que es creado el empleado
            this.getListCollections();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualizaciòn de un servicio
      this.globalService
        .updateModel(this.collection.id, this.new, "/api/requirement")
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.getListCollections();
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear
  open(content, action, index: number) {
    //==============================================================================
    //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
    //por ejemplo en los botones del modal que  ejecutan la funcion C() cierra el modal y se termina de cumplir la promesa
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
    this.collection = Object.assign({}, this.collections[this.selectedRow]); //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

    if (action == "show") {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
      this.modalIcon = "fa fa-close";
    } else if (action == "create") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalIcon = "fa fa-plus";
    } else if (action == "edit") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
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

 
// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.collection = Object.assign({}, this.collections[this.selectedRow]);
    this.showNew = true;
    
    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.collection.id, "/api/requirement")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.getListCollections();
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
