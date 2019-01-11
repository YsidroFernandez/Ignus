import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService} from '../../providers/global.service';
import { GlobalsProvider} from '../../shared';
import { HttpHeaders } from '@angular/common/http';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
  animations:[routerTransition()],
    providers: [GlobalsProvider]
})
export class ReservaComponent implements OnInit {
  datosUser: any;
  transactions: any;
  trans: any;
	url: string;
  closeResult: string;
  selectedTransaction: any;
  public numbPage: number;
  public numPage: number;
  public listTransacciones:any;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    public globalService: GlobalService,
    private modalService: NgbModal,
    private globals: GlobalsProvider) { 
  	this.transactions = [];
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

  open(content){
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
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
      return `with: ${reason}`;}
    }

  otro(){//esto debería sacar los datos que van para el modal y no lo está haciendo
    this.numPage = this.globals.numPage;       
    this.numbPage = this.globals.numPage;       
    console.log("num", this.numPage);
      let id =  (JSON.parse(localStorage.getItem('user'))).id;//antes de aca, necesito es un selectedTransaction
      this.globalService.getModel('/api/employee/transaction/'+ id)
      .then(res=>{
          this.listTransacciones=res['data'];
          console.log("Las transacciones:",this.listTransacciones);
      },
      error=>{
          console.log(error);
      })
  }

  detallesTransaccion(trans){
    this.selectedTransaction=trans;
    console.log("Es este ", this.selectedTransaction)
    }

  ngOnInit() {
    this.getUserData();
    this.getListTransactions();
    this.otro();
  }
}