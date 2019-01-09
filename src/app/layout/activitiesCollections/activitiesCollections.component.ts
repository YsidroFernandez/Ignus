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
  disabled: boolean;
  btnEdit: any;
  files: File[] = [];
  requirements:any;
  employee:any;
  //transactions: any;

  public activities: any = [];
  public client :any = [];
  public transactions = [];
  public transaction = [];

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
    nameForClient:"",
    transaction:"",
    activities:""
    }

    /*public activities: {
      description: "";
      id: "";
      name: "";
      reviewDate: "";
      status: ""
    }*/




  constructor(public globalService: GlobalService) {

  const userId = JSON.parse(localStorage.user).id;
  console.log(userId);
  this.globalService.getModel_Id(userId, '/api/client/transaction')
  .then((result) => {
    if (result['status']) {
      this.transactions = result['data'];
      console.log(this.transactions);
  }
}, (err) => {
    console.log(err);
});


  }

  ngOnInit() {

    const userId = JSON.parse(localStorage.user).id;
    console.log(userId);
    this.globalService.getModel_Id(userId, '/api/client/transaction')
    .then((result) => {
    console.log(result);

      this.employee = result['data']['employee'];
      this.activities = result['data']['activities'];


  }, (err) => {
    console.log(err);
    // this.loader.dismiss();
  });

  this.globalService.getModel_Id(userId, '/api/client')
  .then((result) => {
  console.log(result);
   this.client = result['data']['person'];
   console.log(this.client);

}, (err) => {
  console.log(err);
  // this.loader.dismiss();
});


  }


 //this method associate to reload states
 load_transaction(transaction){
  this.transaction = [];
  this.activities = [];
  console.log(transaction);
  this.globalService.getModel(`/api/transaction/${transaction}`).then((result) => {
      if (result['status']) {
          this.transaction= result['data'];
          console.log(this.transaction);
          this.activities=result['data']['activities'];
          console.log(this.activities);
          this.requirements = result['data']['requirements'];
      }
  }, (err) => {
      console.log(err);
  });

}


}
