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
import { NgxCoolDialogsService } from "ngx-cool-dialogs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-visita",
  templateUrl: "./visita.component.html",
  styleUrls: ["./visita.component.scss"],
  animations: [routerTransition()],
  providers: []
})
export class VisitaComponent implements OnInit {
  closeResult: string;
  modalTitle: string = "Informe de Visitas";
  modalIcon: string = "fa fa-plus";
  modalName: any;
  modalTemplate: any;
  inspections: any;
  requests: any ;
  inspection: any;
  role: any;
  new: any;
  showView: Boolean = false;
  // It maintains employes form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = "Save";
  disabled: boolean;
  selectedRow: number;
  // public fileUpload: any;
  // public fileToUploadInspection: File = null;
  selectedFile: File;
  fileToUploadRecaudo:File;
  searchfilter: string;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    public globalService: GlobalService,
    private coolDialogs: NgxCoolDialogsService
  ) {
  }
  ngOnInit() {
    this.getInspections();
    this.getRequest();
  }
  getInspections() {
    this.globalService.getModel("/api/inspection").then(
      result => {
        this.inspections = result["data"];
        console.log(this.inspections);
      },
      err => {
        console.log(err);
      }
    );
  }

  getRequest(){
    this.globalService.getModel("/api/request?status").then(
      result => {
        // console.log(result);
        this.requests = result["data"];
      },
      err => {
        console.log(err);
      }
    );
  }

  registrar() {
    this.router.navigate(["/visita/add"]);
  }

  apiAction() {

    const uploadData = new FormData();
    uploadData.append("myFile", this.selectedFile, this.selectedFile.name);
    
    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({
      observation: this.inspection.observation,
      RequestId: this.inspection.request_id,
  
    });
    console.log(this.new);
    uploadData.append("inspection", this.new);
    console.log(uploadData);
    if (this.submitType === "create") {
      //metodo que perimite enviar por post un nuevo empleado
      this.globalService.addModel(uploadData, "/api/inspection",this.globalService.getHeaderClear()).then(
        result => {
          console.log(result);
          if (result["status"]) {
            //Para que actualice la lista una vez que es creado el empleado
            this.getInspections();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualizaciòn de un servicio
      this.globalService.updateModel(this.inspection.id ,uploadData, "/api/inspection", this.globalService.getHeaderClear())
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.getInspections();
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
    console.log(action);
    this.inspection = [];
    this.disabled = false;
    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action; // variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
    this.inspection = Object.assign({}, this.inspections[this.selectedRow]); 
    if (index != -1) {
      //el caso index -1 es cuando se solicita crear, ver html
      // this.inspection = Object.assign({}, this.inspections[this.selectedRow]); 
      this.inspection.request_id = Object.assign({}, this.inspections[this.selectedRow].request.id); 
      console.log(this.inspection.request_id);
    }

    if (action == "show") {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
      this.showView = false;
      this.modalIcon = "fa fa-close";
    } else if (action == "create") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.showView = true;
      this.modalIcon = "fa fa-plus";
    } else if (action == "edit") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalIcon = "fa fa-edit";
      this.showView = false;
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
    this.inspection = Object.assign({}, this.inspections[this.selectedRow]);
    this.showNew = true;

    this.coolDialogs
      .confirm("Esta seguro que desea eliminar?") //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.globalService
            .removeModel(this.inspection.id, "/api/inspection")
            .then(
              result => {
                console.log(result);
                if (result["status"]) {
                  //Para que actualice la lista una vez que es eliminado el service
                  this.getInspections();
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

  onSelectFile(event) {
    console.log(event); // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedFile = event.target.files[0];
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        let target: any = event.target; //<-- This (any) will tell compiler to shut up!
        // this.url = target.result;
        console.log(event); // called once readAsDataURL is completed
      };
    }
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }
 
}
