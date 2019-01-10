import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService} from '../../providers/global.service';
import { HttpHeaders } from '@angular/common/http';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
  animations:[routerTransition()]
})
export class ReservaComponent implements OnInit {
	inmuebles: any;
  datosUser: any;
  transactions: any;
	url: string;
	inmuebleApi= "/api/property";

  constructor(public globalService: GlobalService) { 
  	this.inmuebles = [];
  }
 
  getUserData(){//esto es para obtener el id y buscar sus transacciones asociadas
    let user = localStorage.getItem('user');
      let obj = JSON.parse(user)
      this.globalService.getModel_Id(obj.id.toString(),"/api/user/").then(
        result => {
          this.datosUser = result["data"];
          console.log(this.datosUser);},
        err => {
          console.log(err); //this.loader.dismiss();
        });
  }

  getListTransactions(){
    let obj = JSON.parse(localStorage.getItem('user'))
    this.globalService.getModel("/api/employee/transaction/"+obj.id).then(
      (result)=>{
        this.transactions = result["data"];
        console.log(this.transactions);},
      (err)=>{
        console.log(err);
      });
  }

  ngOnInit() {
    this.getUserData();
    this.getListTransactions();
  }
}