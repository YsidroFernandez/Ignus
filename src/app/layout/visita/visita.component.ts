import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-visita',
    templateUrl: './visita.component.html',
    styleUrls: ['./visita.component.scss'],
    animations: [routerTransition()],
    providers: [] 
})
export class VisitaComponent implements OnInit {

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

    showNew: Boolean = false;
    closeResult: string;
    submitType: string = 'Guardar';
    selectedRow: number;
    constructor(private modalService: NgbModal,
                 public router: Router) {

    }
    ngOnInit() {

    }

    registrar() {
        this.router.navigate(['/visita/add']);
    }
}
