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
    public pages = 1;
    closeResult: string;
    clientes: any;
    cliente: any;
    nuevo: any;
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

  public listSeguimiento:any;
  public listSolicitudes:any;


  constructor(
      private modalService: NgbModal, 
      private globals: GlobalsProvider, 
      public globalService: GlobalService) {

    this.clientes = [];
    this.cliente = [];
    this.nuevo = [];
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
    this.globalService.getModel("/api/client")
    .then((result) => {
        console.log(result);
        this.clientes = result['data'];
        console.log(this.clientes);
    }, (err) => {
        console.log(err);
    });

      this.globalService.getModel('/api/request/pending')
      .then(res=>{
        this.listSolicitudes=res['data'];
        console.log("Las solicitudes: ",this.listSolicitudes);
      },
      error=>{
          console.log(error);
      })

    this.listSeguimiento=[
        { fecha: "16/11/2018", descripcion: 'Compra de Casa en el Este de Barqto', estatus:'	Esperando Recaudos'},
        { fecha: "16/12/2018", descripcion: 'Alquiler de apartamento', estatus: 'Reserva realizada' }

    ];

  }

    detallesSolicitud(solicitud){
        this.solicitudSelect=solicitud;
    }
  faEye = faEye;

}
