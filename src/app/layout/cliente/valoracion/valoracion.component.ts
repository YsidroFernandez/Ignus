import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../providers/global.service';
import { routerTransition } from "../../../router.animations";
@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.scss'],
  animations: [routerTransition()],
})
export class ValoracionComponent implements OnInit {
  valorations:  any;
  qualification: any = [];
  

  constructor(public globalService: GlobalService) { 
   }

  ngOnInit() {
    this.getListValoration();
    this.allQualification();
  }
  getListValoration() {
    this.globalService.getModel("/api/typeCalification").then(
      result => {
         this.valorations = [];
        this.valorations = result["data"]; 
      },
      err => {
        console.log(err);
      }
    );
  }

  allQualification(){
    this.globalService.getModel("/api/qualificationCriteria").then(
      result => {
        this.qualification = [];
        this.qualification = result["data"];
        console.log(this.qualification);
      },
      err => {
        console.log(err);
      }
    );
  }


  // /api/calification/ 

  // private newMethod(): String {
  //   return "/api/typeCalification";
  // }
}
