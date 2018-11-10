import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  animations: [routerTransition()],
})


export class AgencyComponent implements OnInit {
  agency: any;
  disabled: boolean;
  btnEdit:any;
  constructor(public globalService: GlobalService) {
    this.agency=[];
    this.disabled=true;
    this.btnEdit="Editar"
   } 
 
  ngOnInit() {
    console.log("init");
    this.globalService.getModel("/api/agency")
    .then((result) => {
      console.log(result);
      this.agency=result['data'];
      console.log(this.agency);
    }, (err) => {
      console.log(err);
      //this.loader.dismiss();
    });

  }

  editAgency(){
    if(this.btnEdit=="Editar"){
      
      this.disabled=false;
      this.btnEdit="Guardar"
      console.log(this.disabled)
    }else{
      console.log("prueba");
      this.disabled=true;
      this.btnEdit="Editar";
    }
    
  }


}