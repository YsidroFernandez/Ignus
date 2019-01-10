 import { Component, OnInit } from '@angular/core';
//import { routerTransition } from '../../router.animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { NgbModal, ModalDismissReasons,NgbDatepickerConfig, NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../providers/global.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

    closeResult: string;
    reclamo: any;
    reclamos: any;
    nuevo: any;

    showNew: Boolean = false;
    submitType: string = 'Save';
    selectedRow: number;

  reclamos2= {

    name: "",
    typeIncidenceId: 3,
    descripcion: "",
    
  }

typeIncidence: any;
descripcion: any;

  constructor(public globalService: GlobalService) { 

    let now = moment().format();
    
    this.nuevo = [];
    this.typeIncidence = [];  


this.globalService.getModel("/api/typeIncidence").then((result) => {
    if (result['status']) {
        //Para que actualice la lista una vez que es creado el recaudo
                this.typeIncidence= result['data'];            
    }
}, (err) => {
    console.log(err);
});

  console.log("hola")
}

enviar() { 
  
  this.nuevo = {  
    name: this.reclamo.idname,
    TypeIncidencesId: Number.parseInt(this.reclamo.TypeIncidencesId), 
    descripcion: this.reclamo.descripcion,
  }; 
console.log("result",this.nuevo);
   this.globalService.addModel(this.nuevo,"/api/Incidence")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista una vez que es creado el recaudo
                            console.log(result);
                        
                    }

                }, (err) => {
                    console.log(err);
                });
  alert("Agregado con exito")
  this.limpiar()
}

limpiar(){

 this.reclamo= {
  
    name: "",
    typeIncidenceId: 3,
    descripcion: "",
}
}
 

  ngOnInit() {
 
  }

}

