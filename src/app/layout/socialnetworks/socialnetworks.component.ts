import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-socialnetworks',
  templateUrl: './socialnetworks.component.html',
  animations: [routerTransition()],
  styleUrls: ['./socialnetworks.component.scss']
})

export class SocialnetworksComponent implements OnInit {
  closeResult: string;
  socialnetworks: any;
  socialnetwork: any;
  nuevo: any;
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;
  
  constructor(private modalService: NgbModal, public globalService: GlobalService) { 
    this.socialnetworks = [];
    this.socialnetwork = [];
    this.nuevo = [];
  }

  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.nuevo = JSON.stringify({name: this.socialnetwork.name , urlLogo:this.socialnetwork.urlLogo , urlAgencySocialNetwork:this.socialnetwork.urlAgencySocialNetwork});
            this.globalService.addModel(this.nuevo,"/api/SocialNetwork")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el socialnetwork
                    this.globalService.getModel("/api/SocialNetwork")
                        .then((result) => {
                            console.log(result);
                            this.socialnetworks = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.socialnetwork.id, this.socialnetwork, "/api/SocialNetwork")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el socialnetwork
                        this.globalService.getModel("/api/SocialNetwork")
                            .then((result) => {
                                console.log(result);
                                this.socialnetworks = result['data'];
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
    })
    this.socialnetwork = "";
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
        this.globalService.getModel("/api/SocialNetwork")
            .then((result) => {
                console.log(result);
                this.socialnetworks = result['data'];
                console.log(this.socialnetworks);
            }, (err) => {
                console.log(err);
            });
  }
  faEdit = faEdit;

  onClean(index: number) {
      this.socialnetwork = "";
  }
  

  onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.socialnetwork = Object.assign({}, this.socialnetworks[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
  console.log('eliminando');
  this.selectedRow = index;
  this.socialnetwork = Object.assign({}, this.socialnetworks[this.selectedRow]);
  this.showNew = true;
  //Pendiente
  if(confirm('¿Estas seguro de eliminar esta Red Social?')){
      this.globalService.removeModel(this.socialnetwork.id, "/api/SocialNetwork")
              .then((result) => {
                  console.log(result);
                  if (result['status']) {
                      //Para que actualice la lista una vez que es eliminado el socialnetworks
                      this.globalService.getModel("/api/SocialNetwork")
                          .then((result) => {
                              console.log(result);
                              this.socialnetworks = result['data'];
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

