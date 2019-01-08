import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  //animations: [routerTransition()],
  styleUrls: ['./perfil.component.scss'],
})

export class PerfilComponent implements OnInit {
    closeResult: string;
    perfil: any;
    perfiles: any;
    nuevo: any;
    requirements:any;
  activities:any;
  employee:any;
  transaction:any;
  test:any;

    states = []
    municipalities = []
    parishes = []

    showNew: Boolean = false;
    step: string;
    submitType: string = 'Save';
    selectedRow: number;

    perfil2 = {
    username: "",
    identification: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    gender:1,
    TypeServiceId: "",
    parish: "",
    municipality: "",
    }

    typeservice: any;
    public client :any = [];
    public state:any = [];

  constructor(public globalService: GlobalService) {

this.nuevo = [];
this.typeservice = [];


  const userId = JSON.parse(localStorage.user).id;
      console.log(userId);
    this.globalService.getModel_Id(userId, '/api/client')
    .then((result) => {
      console.log(result);


       this.client = result['data'];
       this.state = result['data']['state'];
       this.requirements = result['data']['requirements'];
       this.activities = result['data']['activities'];
       this.employee = result['data']['employee'];

      //this.transaction = result['data'];
      //console.log(this.transaction);


  console.log(this.client.firstName);

    }, (err) => {
      console.log(err);
      // this.loader.dismiss();
    });


this.globalService.getModel("/api/typeService").then((result) => {
    if (result['status']) {
        //Para que actualice la lista
                this.typeservice = result['data'];

    }
}, (err) => {
    console.log(err);
});

this.globalService.getModel(`/api/state/`).then((result) => {
    if (result['status']) {
        this.states = result['data'];
    }
}, (err) => {
    console.log(err);
});

  }


  //this method associate to reload states
loadmunicipality(state){
    this.municipalities = [];
    this.parishes = [];

    this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
        if (result['status']) {
            //municipios
            this. municipalities = result['data'];
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

    //Metodo del boton Enviar
 enviar() {

  this.nuevo = {
  lastName: this.perfil.lastName,
  firstName: this.perfil.firstName,
  identification: this.perfil.identification,
  birthDate: this.perfil.birthDate,
  email: this.perfil.email,
  state: this.perfil.state,
  TypeServiceId: Number.parseInt(this.perfil2.TypeServiceId),
  };

console.log("result",this.nuevo);
   this.globalService.addModel(this.nuevo,"/api/client")
                .then((result) => {
                    console.log(result);
                    if (result['status']) {
                        //Para que actualice la lista
                            console.log
(result);
                    }

                }, (err) => {
                    console.log(err);
                });
  alert("Agregado con exito")
  this.limpiar()
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

  }
}

       show() {
        console.log("aqui va el loaer");
    }

  ngOnInit() {

        this.show();
        this.globalService.getModel("/api/client")
            .then((result) => {
                console.log(result);
                this.perfil = result['data'];
                console.log(this.perfil);
            }, (err) => {
                console.log(err);
            });
  } faEdit = faEdit;

  onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.perfil = Object.assign({}, this.perfil[this.selectedRow]);
        this.showNew = true;
    }

    onCancel() {
        // Hide Usuario entry section.
        this.showNew = false;
    }

}
