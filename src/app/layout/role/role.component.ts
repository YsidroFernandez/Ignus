import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

//import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: [routerTransition()],
    //providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})


export class RoleComponent implements OnInit {

 
  
  closeResult: string;

  // It maintains list of usuarios
usuarios: any;
roles:any;
// It maintains Usuario Model
//regModel: Usuario = new Usuario();
// It maintains Usuario form display status. By default it will be false.
showNew: Boolean = false;
// It will be either 'Save' or 'Update' based on operation.
submitType: string = 'Guardar';
// It maintains table row index based on selection.
selectedRow: number;
// It maintains Array of countries.


constructor(private modalService: NgbModal) {
 // Add default Usuario data.
  this.roles=[{'name':'Agente', 'description':'ninguna'},{'name':'Agente2', 'description':'ninguna'}];
}

ngOnInit() {
// this.show();
}
show() {
 
 // setTimeout(() => this.spinnerService.hide(), 4000)
}


// This method associate to New Button.
onNew() {
 // Initiate new Usuario.
 
 // Change submitType to 'Save'.
 this.submitType = 'Guardar';
 // display Usuario entry section.
 this.showNew = true;
}


// This method associate to Edit Button.
onEdit(index: number) {
 // Assign selected table row index.
 this.selectedRow = index;
 // Initiate new Usuario.
 
 // Retrieve selected Usuario from list and assign to model.
 //this.regModel = Object.assign({}, this.usuarios[this.selectedRow]);
 // Change submitType to Update.
 this.submitType = 'Actualizar';
 // Display Usuario entry section.
 this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
 // Delete the corresponding Usuario entry from the list.
 if(confirm('¿Estas seguro de eliminar este usuario?')){
 this.usuarios.splice(index, 1);
 }
}

// This method associate toCancel Button.
onCancel() {
 // Hide Usuario entry section.
 this.showNew = false;
}

// This method associate to Bootstrap dropdown selection change.
onChangeEstado(estado: string) {
 // Assign corresponding selected estado to model.
 //this.regModel.estado = estado;
}



 open(content) {
   console.log("aqui");
     this.modalService.open(content).result.then((result) => {

     this.closeResult = `Closed with: ${result}`;
      if (this.submitType === 'Guardar') {
   // Push Usuario model object into Usuario list.
  // this.usuarios.push(this.regModel);
   console.log(this.submitType);
 } else {
   this.submitType = 'Actualizar';
   // Update the existing properties values based on model.
  

  // this.regModel = Object.assign({}, this.usuarios[this.selectedRow]);

  // console.log( this.usuarios[this.selectedRow]);
   console.log("nada");
 }
 // Hide Usuario entry section.
 this.showNew = false;
     }
     , (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
 }

 private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
         return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
         return 'by clicking on a backdrop';
     } else {
         return  `with: ${reason}`;
     }
 }


 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;

}










