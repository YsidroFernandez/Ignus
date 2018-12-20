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
  customers: any;
  client: any;
  new: any;
  states: any;
  municipalities: any;
  parishes: any;

  data = {
      state:"",
      municipality:"",
      parish:""
  }



  // It maintains customers form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.customers = [];
      this.client = [];
      this.new = [];
      this.states = [];
      this.municipalities = [];
      this.parishes = [];
   }


//this method associate to reload states
loadmunicipality(state){
    this. municipalities = [];
    this.parishes = []; 
    this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
        if (result['status']) {
            this. municipalities = result['data'];
        }
    }, (err) => {
        console.log(err);
    });
    
}

loadparish(municipality){
    console.log("muni ",municipality)
    this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
        if (result['status']) {
            this.parishes = result['data'];
                    
        }
    }, (err) => {
        console.log(err);
    });
    
}


  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
           //Aquí no se crean customers. eso se hace cuando se suscribe
        }else{
            console.log(this.client.userId);
            this.globalService.updateModel(this.client.userId, this.client, "/api/client")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el client
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.customers = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide client entry section.
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
            this.customers = result['data'];
            console.log(this.customers);
        }, (err) => {
            console.log(err);
        });

    this.globalService.getModel(`/api/state/`).then((result) => {
        if (result['status']) {
            this.states = result['data'];         
        }
    }, (err) => {
        console.log(err);
    });
    

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.client = Object.assign({}, this.customers[this.selectedRow]);
    this.data.state = this.client.state.name;
    this.showNew = true;
    console.log(this.data.state);
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.client = Object.assign({}, this.customers[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar este client?')){
        this.globalService.removeModel(this.client.userId, "/api/client")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la client
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.customers = result['data'];
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
    // Hide client entry section.
    this.showNew = false;
}


}
