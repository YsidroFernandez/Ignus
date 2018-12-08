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
  btnEdit: any;
  files: File[] = [];
  requirements:any;
  employee:any;

  public activities = [];
  public client :any = [];

  constructor(public globalService: GlobalService) {

  }

  ngOnInit() {

    const userId = JSON.parse(localStorage.user).id;
    console.log(userId);
    this.globalService.getModel_Id(userId, '/api/client/transaction')
    .then((result) => {
    console.log(result);


     this.client = result['data'];

     this.requirements = result['data']['requirements'];
      this.employee = result['data']['employee'];
      this.activities = result['data']['activities'];
     console.log(this.activities);

  }, (err) => {
    console.log(err);
    // this.loader.dismiss();
  });


  }

}
