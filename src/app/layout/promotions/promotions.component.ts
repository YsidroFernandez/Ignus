import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-activities',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  animations: [routerTransition()]
})
export class PromotionsComponent implements OnInit {
  closeResult: string;
  promotions: any;
  promotion: any;
  faEdit = faEdit;
  modalTitle: string = "Promociones";
  modalIcon: string = "fa fa-plus";
  modalName: any;
  modalTemplate: any;
  submitType: string = "Save";
  disabled: boolean;
  disabled1: boolean = true;
  new: any;
  url: string;
  show1: boolean= false;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  selectedRow: number;
  selectedFile: File;

  
  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      this.promotions = [];
      this.promotion = [];
      this.new = [];
   }

   apiAction() {
    const uploadData = new FormData();
    uploadData.append("myFile", this.selectedFile, this.selectedFile.name);

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({
      name: this.promotion.name,
      description: this.promotion.description
    });

    uploadData.append("inspection", this.new);
    if (this.submitType === "create") {
      console.log(this.new);
      //metodo que perimite enviar por post un nuevo empleado
      this.globalService.addModel(uploadData, "/api/promotion",this.globalService.getHeaderClear()).then(
        result => {
          console.log(result);
          if (result["status"]) {
            //Para que actualice la lista una vez que es creado el empleado
            this.allPromotion();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualizaciòn de un servicio
      this.globalService
        .updateModel(this.promotion.id, uploadData, "/api/promotion",this.globalService.getHeaderClear())
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.allPromotion();
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
    this.promotion = Object.assign({}, this.promotions[this.selectedRow]); //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

    if (action == "show") {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
      this.modalIcon = "fa fa-close";
      this.url = this.promotion.urlImage;
    } else if (action == "create") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalIcon = "fa fa-plus";
     this.url="";
    } else if (action == "edit") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      this.modalIcon = "fa fa-edit";
      this.url = this.promotion.urlImage;
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

ngOnInit() { 
   this.allPromotion();
}


 allPromotion(){
    this.globalService.getModel("/api/promotion")
    .then((result) => {
        console.log(result);
        this.promotions = result['data'];
    }, (err) => {
        console.log(err);
    });
 }


 // This method associate to Delete Button.
 onDelete(index: number) {
     console.log('eliminando');
     this.selectedRow = index;
     this.promotion = Object.assign({}, this.promotions[this.selectedRow]);
     this.showNew = true;
     
     this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
         .subscribe(res => {
             if (res) {
                 console.log(res);
                 this.globalService.removeModel(this.promotion.id, "/api/promotion")
                     .then((result) => {
                         console.log(result);
                         if (result['status']) {
                             //Para que actualice la lista una vez que es eliminado el service
                             this.allPromotion();
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


onSelectFile(event) {
  console.log(event); // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    this.selectedFile = event.target.files[0];
    
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = event => {
      let target: any = event.target; //<-- This (any) will tell compiler to shut up!
      this.url = target.result;
      console.log(event); // called once readAsDataURL is completed
    };
  }
}

onFileChanged(event) {
  console.log(event);
  this.selectedFile = event.target.files[0];
}
    


}


