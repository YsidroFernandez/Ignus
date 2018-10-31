import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-registrar-visita',
    templateUrl: './registrar-visita.component.html',   
    animations: [routerTransition()],
    providers: []
})
export class RegistrarVisitaComponent implements OnInit {

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

    showNew: Boolean = false;
    closeResult: string;
    submitType: string = 'Guardar';
    selectedRow: number;
    constructor(private modalService: NgbModal) {

    }
    ngOnInit() {

    }

    onEdit(index: number) {
        // Change submitType to Update.
        this.submitType = 'Actualizar';
        // Display Usuario entry section.
        this.showNew = true;
    }

    open(content) {
        this.modalService.open(content).result.then(() => { });
    }

    newOpen(contents) {
        this.modalService.open(contents).result.then(() => { });
            

    }
}