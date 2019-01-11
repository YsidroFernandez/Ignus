import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../providers/global.service';
import { GlobalsProvider } from '../../../shared';

@Component({
  selector: 'app-dashboardcustomer',
  templateUrl: './dashboardcustomer.component.html',
  styleUrls: ['./dashboardcustomer.component.scss'],
  providers: [GlobalsProvider]
})
export class DashboardcustomerComponent implements OnInit {
    public numbPage: number;
    public numPage: number;
    public solicitudSelect: any;
    public transaccionSelect: any;
    public pages = 1;
    public usuario : any;
    closeResult: string;
    clientes: any;
    cliente: any;
    nuevo: any;
    user:any;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

  public listTransacciones:any;
  public listSolicitudes:any;



  constructor(
      private modalService: NgbModal, 
      private globals: GlobalsProvider, 
      public globalService: GlobalService) {

    this.clientes = [];
    this.cliente = [];
    this.nuevo = [];
    this.user = JSON.parse(localStorage.user);
  } 

 open(content) {
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
            return `with: ${reason}`;
        }
    }

    show() {
        console.log("aqui va el loaer");
    }

  ngOnInit() {
    this.numPage = this.globals.numPage;       
    this.numbPage = this.globals.numPage;       
    this.show();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
      let id=  this.usuario.person.id;
      this.globalService.getModel('/api/client/request/'+id)
      .then(res=>{
        this.listSolicitudes=res['data'];
        console.log("Las solicitudes: ",this.listSolicitudes);
      },
      error=>{
          console.log(error);
      })

      this.globalService.getModel('/api/client/transaction/'+ id)
      .then(res=>{
          this.listTransacciones=res['data'];
          console.log("Las transacciones:",this.listTransacciones);
      },
      error=>{
          console.log(error);
      })

  }

    detallesSolicitud(solicitud){
        this.solicitudSelect=solicitud;
    }

    detTransaccion(transaccion){
        this.transaccionSelect = transaccion;
        console.log("Es este",this.transaccionSelect)
    }

  faEye = faEye;

}
