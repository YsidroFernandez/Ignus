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
    promotions: any = [];
    assignpromotion: any = [];


    inmuebles: any = [];
    new: any;
    public id_promotion: any;
    public properties: any = [];   

   
    showNew: Boolean = false; 
    submitType: string = 'Save';
    selectedRow: number;

    constructor(private modalService: NgbModal,
        public globalService: GlobalService) {

      
        this.assignpromotion = [];
        this.new = [];

    }
    
    ngOnInit() {
        this.show();        
        this.allPromotion();
        this.allInmuebles();
    }

    promotionChanged ($event){
        console.log($event);
    }

    allPromotion(){
        this.globalService.getModel("/api/promotion").then((result) => {         
                this.promotions = [];
                this.promotions = result['data'];
                console.log(this.promotions);
            }, (err) => {
                console.log(err);
            });           
    }

    allInmuebles(){
        this.globalService.getModel("/api/property").then((result) => {         
                this.inmuebles = [];
                this.inmuebles = result['data'];
                console.log(this.inmuebles);
            }, (err) => {
                console.log(err);
            });           
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {
                this.new = JSON.stringify({ name: this.assignpromotion.name, description: this.assignpromotion.description });
                this.globalService.addModel(this.new, "/api/assignpromotion")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {
                            //Para que actualice la lista una vez que es creado el promotion
                            this.globalService.getModel("/api/assignpromotion")
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
            } else {
                this.globalService.updateModel(this.assignpromotion.id, this.assignpromotion, "/api/assignpromotion")
                    .then((result) => {
                        if (result['status']) {
                            //Para que actualice la lista una vez que es editado el promotion
                            this.globalService.getModel("/api/assignpromotion")
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

    show() {
        console.log("aqui va el loader");
    }


    faEdit = faEdit;


    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.assignpromotion = Object.assign({}, this.promotions[this.selectedRow]);
        this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.assignpromotion = Object.assign({}, this.promotions[this.selectedRow]);
        this.showNew = true;
        //Pendiente
        if (confirm('¿Estas seguro de eliminar esta promotion?')) {
            this.globalService.removeModel(this.assignpromotion.id, "/api/assignpromotion")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es eliminado la promotion
                        this.globalService.getModel("/api/assignpromotion")
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
