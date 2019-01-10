 import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { DragulaService } from 'ng2-dragula';
import { GlobalsProvider } from '../../shared';

@Component({
    selector: 'app-activities',
    templateUrl: './assignpromotions.component.html',
    styleUrls: ['./assignpromotions.component.scss'],
    providers: [GlobalsProvider],
    animations: [routerTransition()]
})
export class AssignPromotionsComponent implements OnInit {
    closeResult: string;   
    assignpromotion: any = [{
        id:''
    }];
    public numPage: number;
    public pages = 1;

    promotions: any = [];
    promotionsFill: any =[];
    inmuebles: any = [];
    new: any;
    public id_promotion: any;
    public property: any = [];
    public properties: any = [];   
   

   
    showNew: Boolean = false; 
    submitType: string = 'Save';
    selectedRow: number;

    constructor(private modalService: NgbModal,
        public globalService: GlobalService,
        private globals: GlobalsProvider) {

      
        this.assignpromotion = [];
        this.new = [];

    }
    
    ngOnInit() {
        this.show(); 
        this.numPage = this.globals.numPage;              
        this.allPromotion();
        this.allInmuebles();
        this.allPromotionFill();
    }

    changeStatus(list){
        console.log(list.bin_status);
        console.log(list.id);
        this.globalService.updateModel(list.id, {activate: list.bin_status},"/api/promotion/activate").then((result) => {         
     
        console.log("RESPONSE", result);
        this.allPromotionFill();
        console.log(this.promotions);
    }, (err) => {
        console.log(err);
    });
}

    promotionChanged ($event){      
        this.id_promotion = $event;
    }

    allPromotion(){
        this.globalService.getModel("/api/promotion").then((result) => {         
                this.promotions = [];
                this.promotions = result['data'];                
            }, (err) => {
                console.log(err);
            });           
    }

    allPromotionFill(){
        this.globalService.getModel("/api/promotion/fill").then((result) => {         
                this.promotionsFill = [];
                this.promotionsFill = result['data'];
                console.log(this.promotionsFill);
            }, (err) => {
                console.log(err);
            });           
    }

    allInmuebles(){
        this.globalService.getModel("/api/property/catalogue").then((result) => {         
                this.inmuebles = [];
                this.inmuebles = result['data'];               
            }, (err) => {
                console.log(err);
            });           
    }

    changeData(property){
        console.log(property);
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {

                for(var i=0;i<this.property.length;i++){
                    this.properties.push(this.property[i].id);
                }
                this.globalService.updateModel(this.id_promotion, {properties: this.properties}, "/api/promotion/properties")
                    .then((result) => {
                        console.log(result);
                        if (result['status']) {      
                            this.allInmuebles();
                            this.allPromotionFill();
                            this.property = [];
                            this.id_promotion = '';
                            //Para que actualice la lista una vez que es creado el promotion
                            
                        }

                    }, (err) => {
                        console.log(err);
                    });
            } 
            // else {
            //     this.globalService.updateModel(this.assignpromotion.id, this.assignpromotion, "/api/assignpromotion")
            //         .then((result) => {
            //             if (result['status']) {
            //                 //Para que actualice la lista una vez que es editado el promotion
            //                 this.globalService.getModel("/api/assignpromotion")
            //                     .then((result) => {
            //                         console.log(result);
            //                         this.promotions = result['data'];
            //                     }, (err) => {
            //                         console.log(err);
            //                     });
            //             }

            //         }, (err) => {
            //             console.log(err);
            //         });

            // }
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
