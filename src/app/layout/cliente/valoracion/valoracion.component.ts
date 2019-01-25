import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../providers/global.service';
import { routerTransition } from "../../../router.animations";
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.scss'],
  animations: [routerTransition()],
})
export class ValoracionComponent implements OnInit {
  valorations:  any;
  qualification: any = [];
  listSelect: any;
  coolDialogs: any;
  bloqueado = true;
  formValidation: FormGroup;
  transactions : any;
  transaction : any;
  transaction_id: any;
  activate: any;
  user:any;
  perfil:any;
  cal: any;

  constructor(public globalService: GlobalService, private formBuilder: FormBuilder) {
    this.user = JSON.parse(localStorage.user).id;
   /* const controls = this.qualification.map(c => new FormControl(false));

    this.formQualification = this.formBuilder.group({

    });
    */
    this.perfil=[];
    this.valorations = [];
    this.qualification = [];
    this.transactions = [];
    this.cal=[];
    this.activate=false;
  }

  ngOnInit() {
    this.allTransaction();
    this.getListValoration();
    this.allQualification();
  }

  allTransaction() {
    this.globalService.getModel(`/api/transaction?userId=${this.user}&status=F`)
      .then((result) => {
        console.log(result);
        
        this.transactions = result['data'];
        console.log(this.transactions);
      }, (err) => {
        console.log(err);
        // this.loader.dismiss();
      });
  }

  sentCalification(typeCal, cry,t_id){
 let answer=[]
 answer.push({"typeCalification":typeCal,"QualificationCriteriumId":cry })
 console.log(answer);
 let calification=[]
 calification.push({"TransactionId": t_id,answer})

    let calification1={
      "TransactionId": 1,
      "answers": [{
          "TypeCalificationId": 4,
          "QualificationCriteriumId": 2
        },{

          "TypeCalificationId": 5,
          "QualificationCriteriumId": 2
        },
      ]
    }



    
  }



  //this method associate to reload states
  dataChanged($event) {
    console.log($event.target.value);
    if($event.target.value!=''){
      this.activate = true;
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
  getListValoration() {
    this.globalService.getModel("/api/typeCalification").then(
      result => {
         this.valorations = [];
         this.valorations = result["data"];
      },
      err => {
        console.log(err);
      }
    );
  }

  allQualification(){
    this.globalService.getModel("/api/qualificationCriteria").then(
      result => {
       
        this.qualification = result["data"];
        console.log(this.qualification);
      },
      err => {
        console.log(err);
      }
    );
  }


  add(item1: any, item2) {
    console.log(item1)
    console.log(item2)

    // if (data.original_customer != this.qualification) {
    //    this.listSelect.push(data.id);

    //  }
    //  if(data.original_customer == this.qualification){

    //    this.coolDialogs.confirm('¿Esta seguro de que la evaluación es la correcta')
    //    .subscribe(res => {
    //      if (res) {
    //        this.listSelect.push(data.id);
    //      }else {

    //      }


    //  });
    //  console.log(this.listSelect);
    //  }
   }

 quit(data) {
   
    //  this.listSelect = this.listSelect.filter(s => s !== data);
    //  console.log(this.listSelect);
   }


   counter: number =0;

checkedState(event, item1, item2) {
            if(event.target.checked === true){
              if(this.counter < 1){
              this.counter++  
              this.add(item1,item2)
              console.log(item2);
            }else{
               event.target.checked = false;
               console.log("por aqui")
            }
            }else if(this.counter>0){
              this.counter--;
            }
        }



  submit() {
    const selectedQualificationIds = this.formValidation.value.orders
      .map((v, i) => v ? this.qualification[i].id : null)
      .filter(v => v !== null);

    console.log(selectedQualificationIds);
  }

}
