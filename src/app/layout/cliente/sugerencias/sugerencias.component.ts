import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  //animations: [routerTransition()],
  styleUrls: ['./sugerencias.component.scss']
})

export class SugerenciasComponent implements OnInit {
	
  public sugerencias: any = {
      title:'',
      type: '',
      description: ''
  };
  //name, description, typeContactId, userId

  constructor() {
  }

  ngOnInit() {
  }

  submit(){
      console.log(this.sugerencias());
  }

}