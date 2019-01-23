import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';


@Component({
  selector: 'app-activitiesCollections',
  templateUrl: './activitiesCollections.component.html',
  styleUrls: ['./activitiesCollections.component.scss']
})


export class ActivitiesCollectionsComponent implements OnInit {

 
  user: any;
  status: any;
  test: any;
  disabled: boolean;
  btnEdit: any;
  files: File[] = [];
  requirements: any;
  employee: any;
  calendar = false;

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

  /*public activities: {
    description: "";
    id: "";
    name: "";
    reviewDate: "";
    status: ""
  }*/

  constructor(public globalService: GlobalService) {
    this.user = JSON.parse(localStorage.user).id;

  }

  ngOnInit() {
    // this.allClient();
    this.allTransaction();
  }

  // allClient() {
  //   this.globalService.getModel_Id(this.user, '/api/client')
  //     .then((result) => {
  //       console.log(result);
  //       this.client = result['data']['person'];
  //       console.log(this.client);

  //     }, (err) => {
  //       console.log(err);
  //       this.loader.dismiss();
  //     });
  // }

  allTransaction() {
    this.globalService.getModel_Id(this.user, '/api/transaction?userId='+this.user)
      .then((result) => {
        this.transactions = [];
        this.transactions = result['data'];
        console.log(this.transactions);
      }, (err) => {
        console.log(err);
        // this.loader.dismiss();
      });
  }

  //this method associate to reload states
  dataChanged($event) {
    console.log($event.target.value);
    if($event.target.value!=''){
      this.calendar = true;
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
  }

  onFileChangeRecaudo(files: FileList, requirementId) {
    // this.fileUpload = {};
    this.fileToUploadRecaudo = files.item(0);
    console.log(this.fileToUploadRecaudo);
    const uploadData = new FormData();
    uploadData.append("myFile", this.fileToUploadRecaudo, this.fileToUploadRecaudo.name);
    uploadData.append("requirementId", requirementId);
    // uploadData.append("agency", JSON.stringify(this.agency));    
    this.globalService.updateModel(this.transaction_id, uploadData, "/api/inspection", this.globalService.getHeaderClear())
      .then(
        result => {
          console.log(result);
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
  }

}
