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
  valorations: any;
  

  constructor(public globalService: GlobalService) {
    this.valorations = [];
   }

  ngOnInit() {
    this.getListValoration();
  }
  getListValoration() {
    this.globalService.getModel("/api/typeCalification").then(
      result => {
        console.log(result);
        this.valorations = result["data"];
        console.log(this.valorations);
      },
      err => {
        console.log(err);
      }
    );
  }

  private newMethod(): String {
    return "/api/typeCalification";
  }
}
