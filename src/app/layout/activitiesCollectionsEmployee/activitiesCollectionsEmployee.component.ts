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

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  user: any;
  status: any;
  test: any;
  disabled: boolean;
  btnEdit: any;
  files: File[] = [];
  requirements: any;
  employee: any;


  public activities: any = [];
  public client: any = [];
  public transactions: any = [];
  public transaction: any = [];
  public transaction_id: any;

  public fileUpload: any;
  public fileToUploadRecaudo: File = null;

  public perfil = {
    username: "",
    identification: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    gender: 1,
    TypeServiceId: "",
    parish: "",
    municipality: "",
    nameForClient: "",
    transaction: "",
    activities: ""
  }


  constructor(public globalService: GlobalService) {
    this.user = JSON.parse(localStorage.user).id;

  }

  ngOnInit() {
    this.allTransaction();
  }


  allTransaction() {
    this.globalService.getModel_Id(this.user, '/api/employee/transaction')
      .then((result) => {
        this.transactions = [];
        this.transactions = result['data'];
        console.log(this.transactions);
      }, (err) => {
        console.log(err);
      });
  }


  //this method associate to reload states
  dataChanged($event) {
    console.log($event.target.value);
    this.transaction_id = $event.target.value;
    this.globalService.getModel(`/api/transaction/${$event.target.value}`).then((result) => {
      if (result['status']) {
        this.transaction = result['data'];
        console.log(this.transaction);
      }
    }, (err) => {
      console.log(err);
    });

  }

  onFileChangeRecaudo(files: FileList, requirementId) {

    this.fileToUploadRecaudo = files.item(0);
    console.log(this.fileToUploadRecaudo);
    const uploadData = new FormData();
    uploadData.append("myFile", this.fileToUploadRecaudo, this.fileToUploadRecaudo.name);
    uploadData.append("requirementId", requirementId);

    this.globalService.updateModel(this.transaction_id, uploadData, "/api/transaction/requirement/upload", this.globalService.getHeaderClear())
      .then(
        result => {
          console.log(result);
        },
        err => {
          console.log(err);
        }
      );
  }


}
