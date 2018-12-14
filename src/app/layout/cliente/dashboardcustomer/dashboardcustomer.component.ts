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


  constructor(private modalService: NgbModal, private globals: GlobalsProvider, public globalService: GlobalService) {

    this.clientes = [];
    this.cliente = [];
    this.nuevo = [];
  }

  open(content) {
    console.log("aqui");
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (this.submitType === "Save") {
           //Aquí no se crean clientes. eso se hace cuando se suscribe
        }else{
            this.globalService.updateModel(this.cliente.id, this.cliente, "/api/client")
                .then((result) => {
                    if (result['status']) {
                        //Para que actualice la lista una vez que es editado el cliente
                        this.globalService.getModel("/api/client")
                            .then((result) => {
                                console.log(result);
                                this.clientes = result['data']['clients'];
                            }, (err) => {
                                console.log(err);
                            });
                    }

                }, (err) => {
                    console.log(err);
                });

        }
        // Hide cliente entry section.
        this.showNew = false;
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

    this.listSeguimiento=[
      { nro: '12345', descripcion: 'Compra de Casa en el Este de Barqto', estatus:'	Esperando Recaudos'},
      { nro: '54545', descripcion: 'Alquiler de apartamento', estatus: 'Reserva realizada' }

    ];
    this.listSolicitudes=[
      {tipo: "Alquiler", descripcion: "Casa grande con todos los servicios", estado: "En Espera",fecha: "11/10/2018", fotos: []},
      {tipo: "Compra", descripcion: "Deseo una casa grande", estado: "En Proceso",fecha: "16/11/2018", fotos: []},
      {tipo: "Venta", descripcion: "Apartamento acogedor con 3 cuartos", estado: "En espera",fecha: "24/09/2018", fotos: []},
      {tipo: "Arrendamiento", descripcion: "Quinta con 5 cuartos y un baño", estado: "En espera",fecha: "24/09/2018 ", fotos: []},
      {tipo: "Compra", descripcion: "Apartemento en el centro de la ciudad", estado: "En Revision",fecha: "24/09/2018 ", fotos: []},
      {tipo: "Compra", descripcion: "casa 2 plantas con garage", estado: "En Revision",fecha: "24/09/2018 ", fotos: []}
    ]
  }
  faEye = faEye;

}
