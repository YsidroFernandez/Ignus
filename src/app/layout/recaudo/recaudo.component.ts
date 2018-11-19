import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';


class Recaudo {
  constructor(
    public servicio: string = 'Selecciona Servicio'
  ) {}
}


@Component({
  selector: 'app-recaudo',
  templateUrl: './recaudo.component.html',
  animations: [routerTransition()],
  styleUrls: ['./recaudo.component.scss']
})


export class RecaudoComponent implements OnInit {
closeResult: string;
  constructor(private modalService: NgbModal) { }


  servicios: string[] = ['Venta', 'Compra', 'Arriendo', 'Alquiler'];


   open(content) {

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
            return  `with: ${reason}`;
        }
    }

  ngOnInit() {

  }
   faEdit = faEdit;
}
