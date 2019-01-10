import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
@Component({
  selector: 'app-activities',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  animations: [routerTransition()]
})
export class PromotionsComponent implements OnInit {
  closeResult: string;
  promotions: any;
  promotion: any;
  new: any;
  // It maintains activities form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  selectedRow: number;

  
  constructor(
    private modalService: NgbModal, public globalService: GlobalService) {
      this.promotions = [];
      this.promotion = [];
      this.new = [];
   }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
            this.new = JSON.stringify({name: this.promotion.name , description:this.promotion.description});
            this.globalService.addModel(this.new,"/api/promotion")
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el promotion
                    this.globalService.getModel("/api/promotion")
                        .then((result) => {
                            console.log(result);
                            this.promotions = result['data'];
                        }, (err) => {
                            console.log(err);
                        });
                }

            }, (err) => {
                console.log(err);
            });
        }else{
            this.globalService.updateModel(this.promotion.id, this.promotion, "/api/promotion")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el promotion
                        this.globalService.getModel("/api/promotion")
                            .then((result) => {
                                console.log(result);
                                this.promotions = result['data'];
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
}

faEdit = faEdit;


 allPromotion(){
    this.globalService.getModel("/api/promotion")
    .then((result) => {
        console.log(result);
        this.promotions = result['data'];
        console.log("Esto"+ this.promotions);
    }, (err) => {
        console.log(err);
    });
 }


onEdit(index: number) {
    this.submitType = 'Update';
    this.selectedRow = index;
    this.promotion = Object.assign({}, this.promotions[this.selectedRow]);
    this.showNew = true;
}

// This method associate to Delete Button.
onDelete(index: number) {
    console.log('eliminando');
    this.selectedRow = index;
    this.promotion = Object.assign({}, this.promotions[this.selectedRow]);
    this.showNew = true;
    //Pendiente
    if(confirm('¿Estas seguro de eliminar esta promotion?')){
        this.globalService.removeModel(this.promotion.id, "/api/promotion")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la promotion
                        this.globalService.getModel("/api/promotion")
                            .then((result) => {
                                console.log(result);
                                this.promotions = result['data'];
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


