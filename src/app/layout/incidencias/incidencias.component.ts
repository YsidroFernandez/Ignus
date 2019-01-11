import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
@Component({
  selector: 'app-activities',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss'],
  animations: [routerTransition()]
})
export class IncidenciasComponent implements OnInit {
  closeResult: string;
  incidencias: any;
  incidencia: any;
  tipoincidencias: any;
  tipoincidencia: any;
  new: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;

  transaction = [
    {id: 1, name: 'que'},
    {id: 2, name: 'ladilla'}  ];

  
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.incidencias = [];
      this.incidencia = [];
      this.tipoincidencias = [];
      this.tipoincidencia = [];

      this.new = [];
   }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.new = JSON.stringify({name: this.incidencia.name , description:this.incidencia.description});
            this.globalService.addModel(this.new,"/api/incidence")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el promotion
                    this.globalService.getModel("/api/incidence")
                        .then((result) => {
                            console.log(result);
                            this.incidencias = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.incidencia.id, this.incidencia, "/api/incidence")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el promotion
                        this.globalService.getModel("/api/incidence")
                            .then((result) => {
                                console.log(result);
                                this.incidencias = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide Usuario entry section.
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

ngOnInit() { 
   this.allPromotion();
   this.getIncidencias();
}

faEdit = faEdit;


 allPromotion(){
    this.globalService.getModel("/api/incidence")
    .then((result) => {
        console.log(result);
        this.incidencias = result['data'];
        console.log("Esto"+ this.incidencias);
    }, (err) => {
        console.log(err);
    });
 }

getIncidencias() {
    this.globalService.getModel("/api/typeIncidence")
    .then((result) => {
        console.log(result);
        this.tipoincidencias = result['data'];
        console.log("Esto"+ this.tipoincidencias);
    }, (err) => {
        console.log(err);
    });

}
onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.incidencia = Object.assign({}, this.incidencias[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.incidencia = Object.assign({}, this.incidencias[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar esta promotion?')){
        this.globalService.removeModel(this.incidencia.id, "/api/incidence")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la promotion
                        this.globalService.getModel("/api/incidence")
                            .then((result) => {
                                console.log(result);
                                this.incidencias = result['data'];
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
    // Hide Usuario entry section.
    this.showNew = false;
}

    


}
