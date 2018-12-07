import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  closeResult: string;
  actividades: any;
  actividad: any;
  nuevo: any;
  // It maintains actividades form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.actividades = [];
      this.actividad = [];
      this.nuevo = [];
   }


  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.nuevo = JSON.stringify({name: this.actividad.name , description:this.actividad.description});
            this.globalService.addModel(this.nuevo,"/api/activity")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el actividad
                    this.globalService.getModel("/api/activity")
                        .then((result) => {
                            console.log(result);
                            this.actividades = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.actividad.id, this.actividad, "/api/activity")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el actividad
                        this.globalService.getModel("/api/activity")
                            .then((result) => {
                                console.log(result);
                                this.actividades = result['data'];
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

show() {
    console.log("aqui va el loaer");
}

ngOnInit() {
    this.show();
    this.globalService.getModel("/api/activity")
        .then((result) => {
            console.log(result);
            this.actividades = result['data'];
            console.log(this.actividades);
        }, (err) => {
            console.log(err);
        });

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.actividad = Object.assign({}, this.actividades[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.actividad = Object.assign({}, this.actividades[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar este usuario?')){
        this.globalService.removeModel(this.actividad.id, "/api/activity")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la actividad
                        this.globalService.getModel("/api/activity")
                            .then((result) => {
                                console.log(result);
                                this.actividades = result['data'];
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
