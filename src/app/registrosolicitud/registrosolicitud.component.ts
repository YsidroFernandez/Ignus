import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { solicitud } from '../../environments/environment';
import { GlobalService } from '../providers/global.service';
import * as moment from 'moment';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';





@Component({
    selector: 'app-registrosolicitud',
    templateUrl: './registrosolicitud.component.html',
    styleUrls: ['./registrosolicitud.component.scss'],
    providers: []
})
export class RegistroSolicitudComponent implements OnInit {
    datePickerConfig: Partial<BsDatepickerConfig>;
    closeResult: string;
    solicitud: any;
    solicitudes: any;
    nuevo: any;

    estados = []
    ciudades = []
    // It maintains recaudos form display status. By default it will be false.
    showNew: Boolean = false;
    // It will be either 'Save' or 'Update' based on operation.
    submitType: string = 'Save';
    selectedRow: number;

  solicitud2= {
    tipo: "",
    ClientId:1,
	TypeServiceId: "",
	wishDate:"",
    TypeRequestId:3,
    estado:[],
    ciudad: []

    
  }

tiposervicio: any;
tipoespecificaciones: any;
especificaciones: any;

constructor(private modalService: NgbModal,public globalService: GlobalService) {

    let now = moment().format();

    this.datePickerConfig = Object.assign({},
        { containerClass: 'theme-dark-blue' },
        { showWeekNumbers: false },
        { dateInputFormat: 'DD/MM/YYYY' },
        { locale: 'es' });

this.solicitud = {ClientId: 1,
TypeServiceId: "",
wishDate:"",
TypeRequestId:3
}
this.nuevo = [];
this.tiposervicio = [];
this.tipoespecificaciones = [];

this.globalService.getModel(`/api/state/`).then((result) => {
    if (result['status']) {
        //Para que actualice la lista una vez que es creado el recaudo
        this.estados = result['data'];
        
    }
}, (err) => {
    console.log(err);
});

this.globalService.getModel("/api/typeService").then((result) => {
    if (result['status']) {
        //Para que actualice la lista una vez que es creado el recaudo
                this.tiposervicio = result['data'];
                
    }
}, (err) => {
    console.log(err);
});

this.globalService.getModel("/api/typeSpecification").then((result) => {
    if (result['status']) {
        //Para que actualice la lista una vez que es creado el recaudo
                this.tipoespecificaciones = result['data'];
                console.log(this.tipoespecificaciones)
    }
}, (err) => {
    console.log(err);
});
      }

     
//this method associate to reload estados
cargarciudades(state){
    console.log(state)
    this.globalService.getModel(`/api/state/city/${state}`).then((result) => {
        if (result['status']) {
            //Para que actualice la lista una vez que es creado el recaudo
            this.ciudades = result['data'];
                    
        }
    }, (err) => {
        console.log(err);
    });
    
}


// This method associate to New Button.
enviar() { 
  
  this.nuevo = JSON.stringify({
    ClientId: this.solicitud.ClientId,
	TypeServiceId: Number.parseInt(this.solicitud.TypeServiceId),
	wishDate: moment(this.solicitud.wishDate).format('DD/MM/YYYY'),
	TypeRequestId: this.solicitud.TypeRequestId
});
console.log("result",this.nuevo);
   this.globalService.addModel(this.nuevo,"/api/request/pending")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                            console.log(result);
                        
                    }

                }, (err) => {
                    console.log(err);
                });
  
 // this.solicitud2.tipo = options[select.value-1].text
//solicitud.push(this.solicitud2)
  alert("Agregado con exito")
  this.limpiar()
}

limpiar(){
  
  this.solicitud= {
  /*  cliente: "1",
    inmueble: {
    tipo: "",
    pisos:"",
    banos: "",
    habitaciones: "",
    descripcion: "",
    direccion: {pais: "",estado:"",municipio:"",parroquia:"",ciudad:"",referencia:""},
    estado: "En espera",
    fotos: []
    },
    fecha: "",
    tipo: "" */
        ClientId:1,
        TypeServiceId: "",
        wishDate:"",
        TypeRequestId:3
}
}


 ngOnInit() {}

 faEye = faEye;
 faEdit = faEdit;
 faTrash = faTrash;

}
