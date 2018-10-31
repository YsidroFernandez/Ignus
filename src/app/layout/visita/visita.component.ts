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
        this.modalService.open(content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
             if (this.submitType === 'Guardar') {
          // Push Usuario model object into Usuario list.
         
          console.log(this.submitType);
        } else {
          this.submitType = 'Actualizar';
          // Update the existing properties values based on model.
         
         
    
        
        }
        // Hide Usuario entry section.
        this.showNew = false;
            }
            , (reason) => {
                
            });
    }
}
