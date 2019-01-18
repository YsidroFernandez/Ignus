import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GlobalService } from '../../../providers/global.service';
//import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  //animations: [routerTransition()],
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent {

    closeResult: string;
    perfil: any = {user: {username:"",id:''},person: {firstName: ""}}
    perfiles: any;
    nuevo: any;
    requirements:any;
    activities:any;
    employee:any;
    transaction:any;
    test:any;

    public states:any = [];
    public municipalities: any = [];
    public parishes: any = [];
    activatespecifications: any = false;
    showNew: Boolean = false;
    step: string;
    submitType: string = 'Save';
    selectedRow: number;

    typeservices: any;
    typeservice: any
    typeproperties: any;
    typeproperty: any;
    
    

  constructor(public globalService: GlobalService) {
this.loadclient();
this.show();
this.loadtypeservices();
this.loadstates();
this.loadtypeproperties();
  }

  loadstates(){
    this.globalService.getModel(`/api/state/`).then((result) => {
        if (result['status']) {
            this.states = result['data'];
        }
    }, (err) => {
        console.log(err);
    });
    
  }

  loadtypeservices(){
    this.globalService.getModel("/api/typeService").then((result) => {
        if (result['status']) {
            //Para que actualice la lista
            
            this.typeservices = result['data'];
            console.log(this.typeservices)
        }
    }, (err) => {
        console.log(err);
    });
    
}

    loadtypeproperties(){
    this.globalService.getModel("/api/typeProperty").then((result) => {
        if (result['status']) {
            //Para que actualice la lista
            this.typeproperties = result['data'];
        }
    }, (err) => {
        console.log(err);
    });
    
}
loadclient(){
    const userId = JSON.parse(localStorage.user).id;
  this.globalService.getModel_Id(userId, '/api/client')
  .then((result) => {
    console.log(result);
     this.perfil = result['data'];
 //    this.state = result['data']['state'];
    
  }, (err) => {
    console.log(err);
    // this.loader.dismiss();
  });



}
  //this method associate to reload states
loadmunicipality(state){
    this.municipalities = [];

    this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
        if (result['status']) {
            //municipios
            this.municipalities = result['data'];
        }
    }, (err) => {
        console.log(err);
    });

}

loadparish(municipality){

    console.log("muni ",municipality)
    this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
        if (result['status']) {
            //Para que actualice la lista una vez que es creado el recaudo
            this.parishes = result['data'];

        }
    }, (err) => {
        console.log(err);
    });

}

loadSpecifications() {
    this.globalService.getModel(`/api/typeProperty/specification/${this.typeproperty}`).then((result) => {
        if (result['status']) {
            this.perfil.specifications = result['data']
            this.activatespecifications = true;
        }
    }, (err) => {
        console.log(err);
    });

}


limpiar(){
  this.perfil = {
    username: "",
    identification: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender:1,
    state: "",
    parish: "",
    municipality: "",
    user: {}
  }
}

   show() {
        console.log("aqui va el loaer");
        console.log(this.perfil);
    }
    faEdit = faEdit;

    
}
