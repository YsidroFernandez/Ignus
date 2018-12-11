import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  closeResult: string;
  clientes: any;
  cliente: any;
  nuevo: any;
  // It maintains clientes form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.clientes = [];
      this.cliente = [];
      this.nuevo = [];
   }


  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
           //Aquí no se crean clientes. eso se hace cuando se suscribe
        }else{
            this.globalService.updateModel(this.cliente.id, this.cliente, "/api/client")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el cliente
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.clientes = result['data']['clients'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide cliente entry section.
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
    this.globalService.getModel("/api/client")
        .then((result) => {
            console.log(result);
            this.clientes = result['data']['clients'];
            console.log(this.clientes);
        }, (err) => {
            console.log(err);
        });

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.cliente = Object.assign({}, this.clientes[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.cliente = Object.assign({}, this.clientes[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar este cliente?')){
        this.globalService.removeModel(this.cliente.id, "/api/client")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la cliente
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.clientes = result['data'];
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
    // Hide cliente entry section.
    this.showNew = false;
}


}
