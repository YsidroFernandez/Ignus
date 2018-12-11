import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  closeResult: string;
  empleados: any;
  empleado: any;
  nuevo: any;
  // It maintains empleados form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.empleados = [];
      this.empleado = [];
      this.nuevo = [];
   }


  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.nuevo = JSON.stringify({identification : this.empleado.identification ,firstName: this.empleado.firstName,lastName: this.empleado.lastName , phoneNumber:this.empleado.phoneNumber, gender: this.empleado.gender, username: this.empleado.username});
            this.globalService.addModel(this.nuevo,"/api/user/employee")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el empleado
                    this.globalService.getModel("/api/employee")
                        .then((result) => {
                            console.log(result);
                            this.empleados = result['data']['employees'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.empleado.id, this.empleado, "/api/employee")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el empleado
                        this.globalService.getModel("/api/employee")
                            .then((result) => {
                                console.log(result);
                                this.empleados = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide empleado entry section.
        this.showNew = false;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

show() {
    console.log("aqui va el loaer");
}

ngOnInit() {
    this.show();
    this.globalService.getModel("/api/employee")
        .then((result) => {
            console.log(result);
            this.empleados = result['data']['employees'];
            console.log(this.empleados);
        }, (err) => {
            console.log(err);
        });

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.empleado = Object.assign({}, this.empleados[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.empleado = Object.assign({}, this.empleados[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar este empleado?')){
        this.globalService.removeModel(this.empleado.id, "/api/employee")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la empleado
                        this.globalService.getModel("/api/employee")
                            .then((result) => {
                                console.log(result);
                                this.empleados = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });
        }
    
      
}


// This method associate toCancel Button.
onCancel() {
    // Hide empleado entry section.
    this.showNew = false;
}


}
