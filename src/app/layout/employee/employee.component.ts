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
  employes: any;
  employee: any;
  nuevo: any;
  // It maintains employes form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.employes = [];
      this.employee = [];
      this.nuevo = [];
   }


  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.nuevo = JSON.stringify({identification : this.employee.identification ,firstName: this.employee.firstName,lastName: this.employee.lastName , phoneNumber:this.employee.phoneNumber, gender: this.employee.gender, username: this.employee.username});
            this.globalService.addModel(this.nuevo,"/api/user/employee")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el employee
                    this.globalService.getModel("/api/employee")
                        .then((result) => {
                            console.log(result);
                            this.employes = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.employee.id, this.employee, "/api/employee")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el employee
                        this.globalService.getModel("/api/employee")
                            .then((result) => {
                                console.log(result);
                                this.employes = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide employee entry section.
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
            this.employes = result['data'];
            console.log(this.employes);
        }, (err) => {
            console.log(err);
        });

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.employee = Object.assign({}, this.employes[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.employee = Object.assign({}, this.employes[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar este employee?')){
        this.globalService.removeModel(this.employee.id, "/api/employee")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la employee
                        this.globalService.getModel("/api/employee")
                            .then((result) => {
                                console.log(result);
                                this.employes = result['data'];
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
    // Hide employee entry section.
    this.showNew = false;
}


}
