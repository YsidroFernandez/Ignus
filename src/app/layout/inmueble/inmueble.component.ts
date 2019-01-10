import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { GlobalService } from "../../providers/global.service";
import { NgxCoolDialogsService } from "ngx-cool-dialogs";

@Component({
  selector: "app-inmueble",
  templateUrl: "./inmueble.component.html",
  styleUrls: ["./inmueble.component.scss"],
  animations: [routerTransition()]
})
export class InmuebleComponent implements OnInit {
  closeResult: string;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  immovables: any;
  property: any;
  typeService: any;
  new: any;
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

  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService,
    private coolDialogs: NgxCoolDialogsService
  ) {}

  getListProperty() {
    this.globalService.getModel("/api/property").then(
      result => {
        console.log(result);
        this.immovables = result["data"];
        console.log(this.immovables);
      },
      err => {
        console.log(err);
      }
    );
  }

  getTypesServices(){
    this.globalService.getModel("/api/typeService").then(
      result => {
        console.log(result);
        this.typeService = result["data"];
        console.log(this.typeService);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getListProperty();
    this.getTypesServices();
  }

  apiAction() {
    //metodo para realizar una accion ya sea crear, editar

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    // this.new = JSON.stringify({identification: this.employee.identification,firstName: this.employee.firstName,lastName: this.employee.lastName,gender: this.employee.gender,username: this.employee.username});
    if (this.submitType === "create") {
      console.log(this.new);
      //metodo que perimite enviar por post un nuevo empleado
      this.globalService.addModel(this.new, "/api/user/employee").then(
        result => {
          console.log(result);
          if (result["status"]) {
            //Para que actualice la lista una vez que es creado el empleado
            this.getListProperty();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualizaciòn de un servicio
      this.globalService
        .updateModel(this.property.id, this.new, "/api/employee")
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.getListProperty();
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
    this.property = Object.assign({}, this.immovables[this.selectedRow]); //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

    if (action == "show") {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
    //   this.showView = false;
      this.modalIcon = "fa fa-close";
    } else if (action == "create") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
    //   this.showView = true;
      this.modalIcon = "fa fa-plus";
    } else if (action == "edit") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalIcon = "fa fa-edit";
    //   this.showView = false;
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
    console.log("eliminando");
    this.selectedRow = index;
    this.property = Object.assign({}, this.immovables[this.selectedRow]);
    this.showNew = true;

    this.coolDialogs
      .confirm("Esta seguro que desea eliminar?") //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.globalService
            .removeModel(this.property.id, "/api/employee")
            .then(
              result => {
                console.log(result);
                if (result["status"]) {
                  //Para que actualice la lista una vez que es eliminado el service
                  this.getListProperty();
                }
              },
              err => {
                console.log(err);
              }
            );
        } else {
          console.log("You clicked Cancel. You smart.");
        }
      });
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide employee entry section.
    this.showNew = false;
  }
}
