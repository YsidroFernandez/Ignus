import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from './models/usuario';


/*class Usuario {
  constructor(
    public nombre: string = '',
    public apellido: string = '',
    public username: string ='',
    public cargo: string ='',
    public dob: NgbDateStruct = null,
    public correo: string = '',
    public contrasena: string = '',
    public estado: string = 'Selecciona Estado'
  ) {}
}*/



@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()],
    providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class UsuarioComponent implements OnInit {
    closeResult: string;

     // It maintains list of usuarios
  usuarios: Usuario[] = [];
  // It maintains Usuario Model
  regModel: Usuario = new Usuario();
  // It maintains Usuario form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Guardar';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  estados: string[] = ['Lara', 'Zulia', 'Yaracuy', 'Miranda'];

  constructor(private modalService: NgbModal) {
    // Add default Usuario data.
    this.usuarios.push(new Usuario('Pedro', 'Leal', '@peleal','Programador frontend', {day: 22, month: 7, year: 1992}, 'peleal@gmail.com', 'pedro123', 'Lara'));
    this.usuarios.push(new Usuario('Jesus', 'Elias', '@jelias', ' Programador backend',{day: 22, month: 7, year: 1992}, 'jelia@gmail.com', 'jesus123', 'Zulia'));
    this.usuarios.push(new Usuario('Jonathan', 'Falcon', '@jofalcon','Scrum Master', {day: 22, month: 7, year: 1992}, 'jofalcon@gmail.com', 'jonathan123', 'Yaracuy'));
    this.usuarios.push(new Usuario('Ysidro', 'Fernandez', '@yferenandez','Programador frontend', {day: 22, month: 7, year: 1992}, 'yfernandez@gmail.com', 'ysidro123', 'Miranda'));
    this.usuarios.push(new Usuario('Williams', 'Querales', '@wiquerales', ' Programador backend',{day: 22, month: 7, year: 1992}, 'wiquerales@gmail.com', 'william123', 'Zulia'));
    this.usuarios.push(new Usuario('Erick', 'Perez', '@eperez','Scrum Master', {day: 22, month: 7, year: 1992}, 'erick@gmail.com', 'erick123', 'Miranda'));
  }

// This method associate to New Button.
  onNew() {
    // Initiate new Usuario.
    this.regModel = new Usuario();
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
    this.regModel = new Usuario();
    // Retrieve selected Usuario from list and assign to model.
    this.regModel = Object.assign({}, this.usuarios[this.selectedRow]);
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
    this.regModel.estado = estado;
  }



    open(content) {
        this.modalService.open(content).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
         if (this.submitType === 'Guardar') {
      // Push Usuario model object into Usuario list.
      this.usuarios.push(this.regModel);
      console.log(this.submitType);
    } else {
      this.submitType = 'Actualizar';
      // Update the existing properties values based on model.
      this.usuarios[this.selectedRow].nombre = this.regModel.nombre;
      this.usuarios[this.selectedRow].apellido = this.regModel.apellido;
      this.usuarios[this.selectedRow].username = this.regModel.username;
      this.usuarios[this.selectedRow].cargo = this.regModel.cargo;
      this.usuarios[this.selectedRow].dob = this.regModel.dob;
      this.usuarios[this.selectedRow].correo = this.regModel.correo;
      this.usuarios[this.selectedRow].contrasena = this.regModel.contrasena;
      this.usuarios[this.selectedRow].estado = this.regModel.estado;

      this.regModel = Object.assign({}, this.usuarios[this.selectedRow]);

      console.log( this.usuarios[this.selectedRow]);
      console.log(this.submitType);
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

    ngOnInit() {}

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

}
