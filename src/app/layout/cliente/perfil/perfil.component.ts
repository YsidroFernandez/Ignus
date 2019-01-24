
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
    perfil: any = {person: {firstName: ""},
                    TypePropertyId: 0,
                    TypeServiceId: 0,
                    ParishId: 0,
                    buildDate:"19/08/1970",
                    typeSpecifications: [],   
                    state: 0,
                    municipality: 0
                    }
    user: any;
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
    typeproperties: any;
    
    passwordactual: any;
    passwordnew: any;
    passwordnew2: any;


  constructor(public globalService: GlobalService) {
      this.user = JSON.parse(localStorage.user)
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
    
  this.globalService.getModel_Id(this.user.id, '/api/client')
  .then((result) => {
    console.log('cliente');
    console.log(result);

    this.perfil.state = result['data'].state.id; 
    this.loadmunicipality(this.perfil.state);
    this.perfil.municipality = result['data'].municipality.id;
    this.loadparish(this.perfil.municipality)
    this.perfil.ParishId = result['data'].parish.id; 
    
    this.perfil.person = result['data'].person;
    console.log(result['data'].specifications.lenght, " ", result['data'].specifications)
    
    if ( result['data'].specifications.lenght != 0 || result['data'].specifications!=undefined){
        this.perfil.typeSpecifications = result['data'].specifications
        this.activatespecifications = true;
    
    }else{
        this.loadSpecifications()
    }
    
    
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
    this.globalService.getModel(`/api/typeProperty/specification/${this.perfil.TypePropertyId}`).then((result) => {
        if (result['status']) {
            this.perfil.specifications = result['data']
            this.activatespecifications = true;
        }
    }, (err) => {
        console.log(err);
    });

}


   show() {
    }
    faEdit = faEdit;

newpassword(){
    if (this.passwordnew==this.passwordnew2){
        var password = {
            "currentPassword": this.passwordactual, 
            "newPassword": this.passwordnew 
          }
          
        this.globalService.updateModel(this.user.id, password, "/api/user")
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                }

            }, (err) => {
                console.log(err);
            });
    }
    }


loadpreferences(){
console.log(this.perfil)

}

newpreferences(){
               
    this.globalService.updateModel(this.user.id,this.perfil, "/api/client/preference")
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                    console.log(result['data'])
                }

            }, (err) => {
                console.log(err);
            });
    }
                }
            }
        }

    }

}