import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'app-activities',
  templateUrl: './assignpromotions.component.html',
  styleUrls: ['./assignpromotions.component.scss'],
  animations: [routerTransition()]
})
export class AssignPromotionsComponent implements OnInit {
  closeResult: string;
  assignpromotions: any;
  assignpromotion: any;
  new: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  constructor(
    private modalService: NgbModal,
     public globalService: GlobalService,
     private dragula: DragulaService) {
      this.assignpromotions = [];
      this.assignpromotion = [];
      this.new = [];
      this.dragula.createGroup("COLUMNS", {
        direction: 'horizontal',
        moves: (el, source, handle) => handle.className === "group-handle"
      });
      this.dragula.dropModel("VAMPIRES").subscribe(args => {
        console.log(args);
      });
   }
   public groups:Array<any> = [
    {
      name: 'CATALOGO DE INMUEBLES',
      items: [{name: 'Apartamento en el este'}, {name: 'Quinta en petare'}, {name: 'Rancho grande'}, {name: 'Alquiler de habitación en el cuji'}]
    },
    {
      name: 'INMUEBLES PARA ASIGNAR',
      items: [{name: ''},{name: ''},{name: ''}]
    }
  ];

   vamps = [
    { name: "Apartamento en el este" },
    { name: "Quinta en petare" },
    { name: "Rancho grande" },
    { name: "Alquiler de habitación en el cuji" }
  ];

  vamps2 = [
  ];

  open(content) {
    this.modalService.open(content).result.then((result) => {
      
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.new = JSON.stringify({name: this.assignpromotion.name , description:this.assignpromotion.description});
            this.globalService.addModel(this.new,"/api/assignpromotion")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el promotion
                    this.globalService.getModel("/api/assignpromotion")
                        .then((result) => {
                            console.log(result);
                            this.assignpromotions = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.assignpromotion.id, this.assignpromotion, "/api/assignpromotion")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el promotion
                        this.globalService.getModel("/api/assignpromotion")
                            .then((result) => {
                                console.log(result);
                                this.assignpromotions = result['data'];
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
    console.log("aqui va el loader");
}

ngOnInit() {
    this.show();
    this.globalService.getModel("/api/assignpromotion")
        .then((result) => {
            console.log(result);
            this.assignpromotions = result['data'];
            console.log(this.assignpromotions);
        }, (err) => {
            console.log(err);
        });

}
faEdit = faEdit;


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.assignpromotion = Object.assign({}, this.assignpromotions[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.assignpromotion = Object.assign({}, this.assignpromotions[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar esta promotion?')){
        this.globalService.removeModel(this.assignpromotion.id, "/api/assignpromotion")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la promotion
                        this.globalService.getModel("/api/assignpromotion")
                            .then((result) => {
                                console.log(result);
                                this.assignpromotions = result['data'];
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
