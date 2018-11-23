import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../providers/global.service';

class Recaudo {
    constructor(
        public servicio: string = 'Selecciona Servicio'
    ) { }
}


@Component({
    selector: 'app-recaudo',
    templateUrl: './recaudo.component.html',
    animations: [routerTransition()],
    styleUrls: ['./recaudo.component.scss']
})


export class RecaudoComponent implements OnInit {
    closeResult: string;
    recaudos: any;
     recaudo: any;
    selectedRow: number;
    submitType: string = 'Guardar';

    constructor(private modalService: NgbModal, public globalService: GlobalService) {
        this.recaudos = [];
        
    }

    // recaudo = new this.recaudos();
    servicios: string[] = ['Venta', 'Compra', 'Arriendo', 'Alquiler'];


    open(content) {
        console.log("aqui");
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
         

        }
            , (reason) => {
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

        this.globalService.getModel("/api/requirement")
            .then((result) => {
                console.log(result);
                this.recaudos = result['data'];
                console.log(this.recaudos);
            }, (err) => {
                console.log(err);
            });

    }
    faEdit = faEdit;

    onEdit(index: number) {
        this.selectedRow = index;
        console.log(index);
        if(this.submitType==="Guardar"){
            console.log(this.recaudos);

            this.globalService.updateModel(index, this.recaudos, "/api/requirement")
            .then((result) => {
                console.log(result);
                // this.recaudo = Object.assign({}, this.recaudos[this.selectedRow]);
            }, (err) => {
                console.log(err);
            });
           
          }
       

        

    }

}

