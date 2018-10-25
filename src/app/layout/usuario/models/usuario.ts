import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Usuario{
  constructor(
    public nombre: string = '',
    public apellido: string= '',
    public username: string= '',
    public cargo: string= '',
    public dob: NgbDateStruct = null,
    public correo: string = '',
    public contrasena: string = '',
    public estado: string = 'Selecciona Estado'){}
}
