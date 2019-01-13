import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-listransactions',
  templateUrl: './listransactions.component.html',
  styleUrls: ['./listransactions.component.scss']
})
export class ListransactionsComponent implements OnInit {



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
  transactionId: any;
  descripcion: any;
  id_requirement: any;
  id_activity: any;
  public type: boolean;
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

}