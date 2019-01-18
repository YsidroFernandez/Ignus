import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publications: any;
  publication: any;
  new: any;
  modalName: any;
  modalTemplate: any;
  closeResult: string;
  modalTitle: string = "Publicaciones";
  modalIcon: string = "fa fa-plus";
  submitType: string = "Save";
  disabled: boolean;
  // It maintains publications form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  selectedRow: number;
  faEdit = faEdit;

  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      this.publications = [];
      this.publication = [];
      this.new = [];
   }

  ngOnInit() {
    this.getListPublications();
  }

   getListPublications() {
    let obj = JSON.parse(localStorage.getItem('user'));
    this.globalService.getModel('/api/transaction?status=D&offeringProperty=true&userId='+obj.id).then(
      result => {
        console.log(result);
        this.publications = result["data"];
        console.log(this.publications);
      },
      err => {
        console.log(err);
      }
    );
  }

  apiAction() {
    //metodo para realizar una accion ya sea crear, editar
    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({
      name: this.publication.name,
      description: this.publication.description
    });
    if (this.submitType === "create") {
      console.log(this.new);
      //metodo que perimite enviar por post un nuevo publicacion
      let obj = this.publication.id;
      this.globalService.addModel(this.new,"/api/property/"+obj).then(//dy: modificar aqui la dirección
        result => {
          console.log(result);
          if (result["status"]) {
            //Para que actualice la lista una vez que es creada la publicacion
            this.getListPublications();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualización de un servicio
      this.globalService
        .updateModel(this.publication.id, this.new, "/api/")//dy:cambiar adress
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.getListPublications();
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
    this.publication = Object.assign({}, this.publications[this.selectedRow]); //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

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
    this.publication = Object.assign({}, this.publications[this.selectedRow]);
    this.showNew = true;    
    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.publication.id, "/api/activity")//dy: cambia
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.getListPublications();
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