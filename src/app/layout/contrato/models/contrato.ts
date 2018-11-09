import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Contrato{
  constructor(
    public dob: string = '',
    public personal: string= '',
    public cliente: string= '',
    public inmueble: string= '',
    public estado: string = 'Selecciona Estado'){}
}
