import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-visita',
    templateUrl: './visita.component.html',
    styleUrls: ['./visita.component.scss'],
    animations: [routerTransition()],
    providers: []
})
export class VisitaComponent implements OnInit {


  constructor() {
   
   } 
    ngOnInit() {}

}
