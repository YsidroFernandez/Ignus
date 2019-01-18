import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../providers/global.service";
import { routerTransition } from "../../router.animations";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
@Component({
  selector: "app-listransactions",
  templateUrl: "./listransactions.component.html",
  styleUrls: ["./listransactions.component.scss"],
  animations: [routerTransition()]
})
export class ListransactionsComponent implements OnInit {
  selectedRow:any;
  searchfilter: string;
  param1:any;
  user: any;
  status: any;
  test: any;
  disabled: boolean;
  crudName:any="Transacciones"
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
  };

  constructor(
    public globalService: GlobalService,
    private route: ActivatedRoute,
    public router: Router
  ) {
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
    console.log(this.crudName);
    console.log(this.transaction_id);
    // this.route.queryParams.subscribe(params => {
    //   console.log(params['id'])
    if (this.transaction_id != null)
    {
      localStorage.setItem("id_transaction", null);
      this.crudName+="-Empleado: "+JSON.stringify(localStorage.name_agent);
    }
     
    else{
      this.crudName="Transacciones"
      this.transaction_id = JSON.parse(localStorage.user).id;
    } 

    this.allTransaction(this.transaction_id);

    // });
  }

  allTransaction(id) {
    this.globalService
      .getModel(
        `/api/transaction?status=P,I,F,C,D,H,Q,R&userId=${id.toString()}`
      )
      .then(
        result => {
          this.transactions = [];
          this.transactions = result["data"];
          console.log(this.transactions);
        },
        err => {
          console.log(err);
        }
      );
  }


  onTransaction(index){
    this.selectedRow = index;
    let tran;
    tran = Object.assign({}, this.transactions[this.selectedRow]);
    console.log(tran);
    localStorage.setItem('id_transaction',tran.id);
    this.router.navigate(['/activitiesEmployee']);
}

  //this method associate to reload states
  dataChanged($event) {
    console.log($event.target.value);
    if ($event.target.value != "") {
      this.calendar = true;
      this.transaction_id = $event.target.value;
      this.globalService
        .getModel(`/api/transaction/${$event.target.value}`)
        .then(
          result => {
            if (result["status"]) {
              this.transaction = result["data"];
              console.log(this.transaction);
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
