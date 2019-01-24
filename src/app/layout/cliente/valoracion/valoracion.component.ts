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




  constructor(public globalService: GlobalService, private formBuilder: FormBuilder) {

   /* const controls = this.qualification.map(c => new FormControl(false));

    this.formQualification = this.formBuilder.group({

    });*/




  }

  ngOnInit() {
    this.getListValoration();
    this.allQualification();
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
        this.qualification = [];
        this.qualification = result["data"];
        console.log(this.qualification);
      },
      err => {
        console.log(err);
      }
    );
  }


  add(data: any) {
    if (data.original_customer != this.qualification) {
       this.listSelect.push(data.id);

     }
     if(data.original_customer == this.qualification){

       this.coolDialogs.confirm('¿Esta seguro de que la evaluación es la correcta')
       .subscribe(res => {
         if (res) {
           this.listSelect.push(data.id);
         }else {

         }


     });
     console.log(this.listSelect);
     }
   }

 quit(data) {
     this.listSelect = this.listSelect.filter(s => s !== data);
     console.log(this.listSelect);
   }


   counter: number =0;

checkedState(event, checkBox) {
            if(event.target.checked === true){
              if(this.counter < 1){
              this.counter++
            }else{
               event.target.checked = false;
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
