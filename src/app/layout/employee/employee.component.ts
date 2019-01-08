import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  closeResult: string;
  modalTitle: string = 'Empleado';
  modalIcon: string = 'fa fa-plus'
  modalName: any;
  modalTemplate: any;
  employes: any;
  employee: any;
  new: any;
  showView:Boolean = false;
  // It maintains employes form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  disabled: boolean;
  selectedRow: number;
  faEdit = faEdit;
  //Arreglo para la seleccion del sexo en editar cliente
  gender = [
    {id: 1, name: 'Masculino'},
    {id: 2, name: 'Femenino'}  ];
  

  constructor(
    private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      this.employes = [];
      this.employee = [];
      this.new = [];
   }


   getListEmployees(){
    this.globalService.getModel("/api/employee")
    .then((result) => {
        console.log(result);
        this.employes = result['data'];
        console.log(this.employes);
    }, (err) => {
        console.log(err);
    });
   }

   
ngOnInit() {
    this.getListEmployees();
   
}

apiAction() { //metodo para realizar una accion ya sea crear, editar

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({identification : this.employee.identification ,firstName: this.employee.firstName,lastName: this.employee.lastName ,gender: this.employee.gender, username: this.employee.username});
    if (this.submitType === "create") {
        //metodo que perimite enviar por post un nuevo empleado
        this.globalService.addModel(this.new, "/api/user/employee")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el empleado
                    this.getListEmployees();
                }

            }, (err) => {
                console.log(err);
            });


    } else {
        //metodo que perimite enviar por put una actualizaciòn de un servicio
        this.globalService.updateModel(this.employee.id, this.new, "/api/employee")
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                    this.getListEmployees();
                }

            }, (err) => {
                console.log(err);
            });
    }
}

   //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear 
   open(content, action, index: number) {
    //==============================================================================
    //promesa necesaria para abrir modal una vez ejecuada, espera la respuesta de algun boton para continuar con la operacion
    //por ejemplo en los botones del modal que  ejecutan la funcion C() cierra el modal y se termina de cumplir la promesa
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //==============================================================================

    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action;// variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index; //aca se toma el indice de el servicio seleccionado
    this.employee = Object.assign({}, this.employes[this.selectedRow]);//se coloca el indice en el arreglo general de servicios para obtener el servicio en especifico

    if (index != -1) { //el caso index -1 es cuando se solicita crear, ver html


        // for (let i in this.service.activities) {//ciclo necesario para mostar actividades
        //     this.ngxActivities.push(this.service.activities[i].id);
        // }
        // for (let i in this.service.requirements) {//ciclo necesario para mostar requerimientos
        //     this.ngxRequirements.push(this.service.requirements[i].id);
        // }
    }

    if (action == 'show') {//si la accion es ver, desabilita los campos del modal
        this.disabled = true;
        this.modalIcon = "fa fa-close"



    }
    else
        if (action == 'create') {//si la accion es distinta de ver los campos del modal quedaran activados
            this.disabled = false;
            this.showView = true;
            this.modalIcon = "fa fa-plus"
        } else
            if (action == 'edit') {//si la accion es distinta de ver los campos del modal quedaran activados
                this.disabled = false;
                this.modalIcon = "fa fa-edit"
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


// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.employee = Object.assign({}, this.employes[this.selectedRow]);
    this.showNew = true;



    this.coolDialogs.confirm('Esta seguro que desea eliminar?') //cooldialog es un componentes para dialogos simples solo establecemos un titulo lo demas viene por defecto 
        .subscribe(res => {
            if (res) {
                console.log(res);
                this.globalService.removeModel(this.employee.userId, "/api/employee")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es eliminado el service
                            this.getListEmployees();
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
    // Hide employee entry section.
    this.showNew = false;
}


}
