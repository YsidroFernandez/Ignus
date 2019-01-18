import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';
import { DragulaService } from 'ng2-dragula';
import { GlobalsProvider } from '../../shared';
import { TabsetConfig } from 'ngx-bootstrap/tabs';


// such override allows to keep some initial values

export function getTabsetConfig(): TabsetConfig {
    return Object.assign(new TabsetConfig(), { type: 'pills' });
}
@Component({
    selector: 'app-activities',
    templateUrl: './assignpromotions.component.html',
    styleUrls: ['./assignpromotions.component.scss'],
    providers: [GlobalsProvider, { provide: TabsetConfig, useFactory: getTabsetConfig }],
    animations: [routerTransition()]
})
export class AssignPromotionsComponent implements OnInit {
    closeResult: string;
    assignpromotion: any = [{
        id: ''
    }];
    public numPage: number;
    public pages = 1;
    inmueble = false;
    promocion = false;
    promotions: any = [];
    promotionsFill: any = [];
    public inmuebles: any = [];
    new: any;
    specifications: any = [];
    public id_promotion: any;
    public property: any = [];
    public specificationSelect: any = [];
    public properties: any = [];
    public specification: any = [];
    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;
    searchfilter: string;

    constructor(private modalService: NgbModal,
        public globalService: GlobalService,
        private globals: GlobalsProvider) {


        this.assignpromotion = [];
        this.new = [];

    }

    ngOnInit() {
        this.show();
        this.numPage = this.globals.numPage;
        this.specificationSelect = [];
        this.property = [];        
        this.id_promotion = '';
        this.allPromotion();
        this.allInmuebles();
        this.allPromotionFill();
        this.allSpecifications();
    }



    promotionChangedPromocion($event) {
        this.id_promotion = '';
        if ($event != '') {
            console.log($event);
            this.promocion = true;
            this.inmueble = false;
            this.id_promotion = $event;
        }

    }
    changeStatus(list) {
        console.log(list.bin_status);
        console.log(list.id);
        this.globalService.updateModel(list.id, { activate: list.bin_status }, "/api/promotion/activate").then((result) => {

            console.log("RESPONSE", result);
            this.allPromotionFill();
        }, (err) => {
            console.log(err);
        });
    }

    allSpecifications() {
        this.globalService.getModel("/api/Specification").then((result) => {
            this.specification = [];
            this.specification = result['data'];
            console.log(this.specification);
        }, (err) => {
            console.log(err);
        });
    }

    promotionChangedInmueble($event) {
        this.id_promotion = '';
        if ($event != '') {
            console.log($event);
            this.inmueble = true;
            this.promocion = false;
            this.id_promotion = $event;
        }

    }

    allPromotion() {
        this.globalService.getModel("/api/promotion").then((result) => {
            this.promotions = [];
            this.promotions = result['data'];
        }, (err) => {
            console.log(err);
        });
    }

    allPromotionFill() {
        this.globalService.getModel("/api/promotion?status=A,I").then((result) => {
            this.promotionsFill = [];
            this.promotionsFill = result['data'];
            console.log(this.promotionsFill);
        }, (err) => {
            console.log(err);
        });
    }

    allInmuebles() {
        this.globalService.getModel("/api/property/catalogue").then((result) => {
            this.inmuebles = [];
            this.inmuebles = result['data'];
            console.log(this.inmuebles);
        }, (err) => {
            console.log(err);
        });
    }

    changeData(property) {
        console.log(property);
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === "Save") {

                if(this.id_promotion == ''){
                    return;
                }
                if (this.inmueble == true) {
                    for (var i = 0; i < this.property.length; i++) {
                        this.properties.push(this.property[i].id);
                    }
                    console.log(this.properties);
                    this.globalService.updateModel(this.id_promotion, { properties: this.properties }, "/api/promotion/properties")
                        .then((result) => {
                            console.log(result);
                            if (result['status']) {
                                this.allInmuebles();
                                this.allPromotionFill();
                                this.property = [];
                                this.id_promotion = '';
                            }

                        }, (err) => {
                            console.log(err);
                        });
                }

                if (this.promocion == true) {
                    for (var i = 0; i < this.specificationSelect.length; i++) {
                        this.specifications.push(this.specificationSelect[i].id);
                    }
                    console.log(this.specifications);
                    this.globalService.updateModel(this.id_promotion, { specifications: this.specifications }, "/api/promotion/specifications")
                        .then((result) => {
                            console.log(result);
                            if (result['status']) {
                                this.specificationSelect = [];
                                this.allInmuebles();
                                this.allPromotionFill();
                               
                                this.id_promotion = '';
                            }

                        }, (err) => {
                            console.log(err);
                        });
                }
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
