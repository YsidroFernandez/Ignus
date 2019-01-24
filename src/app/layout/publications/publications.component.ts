import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publications: any; //catalogue
  publication: any;
  transactions: any = [];
  transaction: any;
  transPublished: any = [];
  tranPublished: any;
  user: any;
  new: any;
  modalName: any;
  modalTemplate: any;
  selectedFile: File;
  url: string;
  closeResult: string;
  modalTitle: string = "Publicaciones";
  modalIcon: string = "fa fa-plus";
  submitType: string = "Save";
  disabled: boolean;
  showView:Boolean = false;
  // It maintains publications form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  selectedRow: number;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  view: boolean;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
     // this.transactions = [];
      //this.transaction = [];
      //this.transPublished =[];
      //this.new = [];
      this.publication = [];
   }

  ngOnInit() {
    this.getUser();
    this.getListTransactionPublished();
    this.getListTransactionToPublish();
  }

   getUser(){
     let obj = JSON.parse(localStorage.getItem('user'));
     this.user = obj.id;
     console.log("GetUSer "+this.user)
   }

   getListTransactionPublished() {
    this.globalService.getModel('/api/transaction?status=H&offeringProperty=false&userId='+this.user).then(
      result => {
        console.log("Result transPublished"+result);
        this.transPublished = result["data"];
        console.log("local transPublished: "+this.transPublished);
      },
      err => {
        console.log("Else error: "+err);
      }
    );
  }

  getListTransactionToPublish(){
    this.globalService.getModel('/api/transaction?status=D&offeringProperty=false&userId='+this.user).then(
      result =>{
        console.log("Result transactions= "+result);
        this.transactions = result["data"];
        console.log("Local transactions: "+this.transactions);
      }),
      err => {
        console.log("Else error= "+err);
      }
  }

  /*getPublish(index: number){
    this.publications = [];
    this.publication = {};
    //buscar la publicación asociada a la transacción a la que le hice click
    this.globalService.getModel('/api/property/catalogue').then(
      result =>{
        this.publications = result["data"];
      }),err =>{
        console.log("Else Error Publish: "+err);
    }
    this.publication = this.publications[2].Publication;
  }*/

  apiAction() {
    //metodo para realizar una accion ya sea crear, editar
    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    console.log("publicación "+this.publication);
    this.new = JSON.stringify({title: this.publication.title,
      description: this.publication.description,
      price: this.publication.price,
      //campos que necesito: title,description,price,images
    });

    if (this.submitType === "create") {
      console.log(this.new);
      //metodo que permite enviar por post un nuevo publicacion
      let obj = this.transaction.id;
      console.log("Transaction en api "+obj);
      const uploadData = new FormData();
      if(this.selectedFile!=null){
        console.log("selectedfile")
        uploadData.append("myFile",this.selectedFile,this.selectedFile.name);}
        uploadData.append("publication", this.new);
      this.globalService.updateModel(obj, uploadData, "/api/property/publication", this.globalService.getHeaderClear())
      .then(
        result => {
          console.log(result);
          console.log(this.publication)
          if (result["status"]){
            //Para que actualice la lista una vez que es creada la publicacion
            this.getListTransactionPublished();
            this.getListTransactionToPublish();
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      //metodo que perimite enviar por put una actualización de un servicio
      this.globalService.updateModel(
        this.transaction.id, this.new, "/api/property/publication")
        .then(
          result => {
            if (result["status"]) {
              //Para que actualice la lista una vez que es editado el service
              this.getListTransactionToPublish();
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear
  open(content, action, index: number, data) {
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
    //se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico
   
   if(data){
    this.transaction = Object.assign({}, this.transactions[this.selectedRow]);
    this.view = true;
    // /api/property/catalogue?typeP=2&status=Barinas
    this.globalService.getModel(`/api/property/publication/${this.transaction.id}`).then(
      result =>{
        console.log(result);
        // this.transactions = result["data"];
        // console.log("Local transactions: "+this.transactions);
      }),
      err => {
        console.log("Else error= "+err);
      }
   
   }else{   
    this.tranPublished = Object.assign({}, this.transPublished[this.selectedRow]);
    this.view = false;
   }
   console.log(this.transaction);
   console.log(this.tranPublished);
    
    // console.log("Nueva Publication: "+this.publication);
    // console.log("transcation id"+this.transaction.id);

    if (action == "show") {
      //si la accion es ver, desabilita los campos del modal
      this.disabled = true;
      //this.showView = false;
      this.modalIcon = "fa fa-close";
    } else if (action == "create") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      //this.showView = true;
      this.modalIcon = "fa fa-plus";
    } else if (action == "edit") {
      //si la accion es distinta de ver los campos del modal quedaran activados
      this.disabled = false;
      //this.showView = false;
      this.modalIcon = "fa fa-edit";
    }
  }//fin del open

/*editAgency() {
    console.log(this.agency);
    if (this.btnEdit == "Editar") {
      this.disabled = false;
      this.btnEdit = "Guardar";
      console.log(this.disabled);
    } else if (this.btnEdit == "Guardar") {
      console.log(this.agency);
      


            this.disabled = true;
            this.btnEdit = "Editar";
          },
          err => {
            console.log(err);
            //this.loader.dismiss();
          }
        );
      
      
    }*/

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
    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componente para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.publication.id, "/api/activity")//dy: cambia
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.getListTransactionPublished();
                        }

                    }, (err) => {
                        console.log(err);
                    });
            } else {
                console.log('You clicked Cancel. You smart.');
            }
        });
}//fin del onDelete

  // This method associate toCancel Button.
  onCancel() {
    // Hide Usuario entry section.
    this.showNew = false;
  }

   onEdit(index: number) {
        //this.publication = {};  
        //this.transaction = {};
        this.submitType = 'Update';
        this.selectedRow = index;
        console.log("en OnEdit: "+this.selectedRow );
        //this.publication = Object.assign({}, this.publications[this.selectedRow]);
        this.transactions = Object.assign({},this.transactions[this.selectedRow]);
        //console.log(this.publication);
        console.log(this.transaction);
        this.showNew = true;
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