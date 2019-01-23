import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../providers/global.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Identifiers } from '@angular/compiler';
@Component({
  selector: 'app-activitiesCollectionsEmployee',
  templateUrl: './activitiesCollectionsEmployee.component.html',
  styleUrls: ['./activitiesCollectionsEmployee.component.scss']
})
export class ActivitiesCollectionsEmployeeComponent implements OnInit {


  @ViewChild('childModal') childModal: ModalDirective;

  data: any;
  user: any;
  status: any;
  test: any;
  disabled: boolean;
  btnEdit: any;
  files: File[] = [];
  requirements: any;
  employee: any;
  calendar = false;
  requirementId: any;
  transactionId: string;
  descripcion: any;
  id_requirement: any;
  id_activity: any;
  public type: boolean;
  public activities: any = [];
  public client: any = [];
  public transactions: any = [];
  public transaction: any = [];
  public transaction_id: any;
  public id_transaction: any;

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
  service: any;

  constructor(public globalService: GlobalService, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.user).id;
  }

  ngOnInit() {
   let trans = JSON.stringify(localStorage.id_transaction);
   if(trans!=null){
    this.transaction_id = JSON.parse(localStorage.id_transaction); //si en local storage esta el id de la transaccion
    console.log("pas")
   }
 
   
    
    console.log(localStorage.name_agent)
    console.log(name);
    
    console.log(this.transaction_id);
    if (this.transaction_id != null)
    {
      localStorage.setItem("id_transaction", null);
      this.getTransactionById(this.transaction_id);
    }
     
    else{
     console.log("aca")
      this.transaction_id = JSON.parse(localStorage.user).id;
      
    } 
    this.allTransaction();

    
    

  }


  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  allTransaction() {//todas las transacciones se ejecuta siempre y cuando no se solicite que las transaccion sea por id

    this.globalService.getModel_Id(this.user, '/api/transaction?userId='+this.user)
      .then((result) => {
        this.transactions = [];
        this.transactions = result['data'];
        console.log(this.transactions);
      }, (err) => {
        console.log(err);
      });
  }

 getTransactionById(id) { //funcion de transacciones por id
  this.calendar = true;
    console.log(id);

    if(id){
    this.globalService.getModel_Id(id, '/api/transaction')
      .then((result) => {
        if(result['status']){
        this.transaction = [];
        this.transaction = result['data'];
        console.log(this.transaction);
      }}, (err) => {
        console.log(err);
      });}
  }

  //this method associate to reload states
  dataChanged($event) {
    console.log($event.target.value);
    if ($event.target.value != '') {
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


  acceptRequirement(id) {
    const body={
      requirementId: id
    }
    this.globalService.updateModel(this.transaction_id, body, "/api/transaction/requirement/approve")
    .then(
      result => {
        console.log(result);
        this.globalService.getModel(`/api/transaction/${ this.transaction_id}`).then((result) => {
          if (result['status']) {
            this.transaction = result['data'];
            console.log(this.transaction);
          }
        }, (err) => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      }
    );
  }


  rejectRequirement(id) {
      this.showChildModal();
      this.id_requirement = id;
      this.type= true;
  }

  acceptActivity(id) {
    const body={
      activityId: id
    }
    this.globalService.updateModel(this.transaction_id, body, "/api/transaction/activity/approve")
    .then(
      result => {
        console.log(result);
        this.globalService.getModel(`/api/transaction/${ this.transaction_id}`).then((result) => {
          if (result['status']) {
            this.transaction = result['data'];
            console.log(this.transaction);
          }
        }, (err) => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  rejectActivity(id) {
    this.showChildModal();
    this.id_activity = id;
    this.type = false;
  }

  saveActivity(descripcion){

    const body={
      activityId: this.id_activity,
      observation: descripcion
    }

    this.globalService.updateModel(this.transaction_id, body, "/api/transaction/activity/reject")
    .then(
      result => {
        console.log(result);
        this.hideChildModal();
        this.globalService.getModel(`/api/transaction/${ this.transaction_id}`).then((result) => {
          if (result['status']) {
            this.transaction = result['data'];
            console.log(this.transaction);
          }
        }, (err) => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      }
    )
  }



  saveRequiment(descripcion)
  {
    console.log(descripcion);

    const body={
      requirementId: this.id_requirement,
      observation: descripcion
    }

    this.globalService.updateModel(this.transaction_id, body, "/api/transaction/requirement/reject")
    .then(
      result => {
        console.log(result);
        this.hideChildModal();
        this.globalService.getModel(`/api/transaction/${ this.transaction_id}`).then((result) => {
          if (result['status']) {
            this.transaction = result['data'];
            console.log(this.transaction);
          }
        }, (err) => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      }
    )

  }

  close() {
    this.hideChildModal();
  }
}
