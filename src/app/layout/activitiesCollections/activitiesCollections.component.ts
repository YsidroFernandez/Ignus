import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { GlobalService } from '../../providers/global.service';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-activitiesCollections',
  templateUrl: './activitiesCollections.component.html',
  styleUrls: ['./activitiesCollections.component.scss']
})
export class ActivitiesCollectionsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


  status: any;
  test: any;
  transaction: any;
  disabled: boolean;
  btnEdit:any;
  files:File[] = [];
  rol: number;
  actividades:string[]=["Actividad 1","Actividad 2","Actividad 3","Actividad 4"];

  recaudos:string[]=["Recaudo 1","Recaudo 2","Recaudo 3","Recaudo 4"];

  constructor(public globalService: GlobalService) {
    this.rol = 1;
  }

  ngOnInit() {

      console.log("init");
    this.globalService.getModel("/api/transaction/")
    .then((result) => {
      console.log(result);
      this.transaction=result['data'];
      console.log(this.transaction);

      this.test = result['data'][0].client.firstName;

      console.log(this.test);

    }, (err) => {
      console.log(err);
      //this.loader.dismiss();
    });

  }

}
