import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { GlobalService } from '../../providers/global.service';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-activitiesCollectionsEmployee',
  templateUrl: './activitiesCollectionsEmployee.component.html',
  styleUrls: ['./activitiesCollectionsEmployee.component.scss']
})
export class ActivitiesCollectionsEmployeeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


  status: any;
  test: any;
  transaction: any;
  disabled: boolean;
  btnEdit:any;
  files:File[] = [];
  rol: number;


  constructor(public globalService: GlobalService) {

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
