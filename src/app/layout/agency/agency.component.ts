import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../providers/global.service';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  animations: [routerTransition()],
})


export class AgencyComponent implements OnInit {
  agency: any;
  disabled: boolean;
  btnEdit:any;
  selectedFile: File;
  url: string;
  constructor(public globalService: GlobalService) {
    this.agency=[];
    this.disabled=true;
    this.btnEdit="Editar"
   } 
   
onSelectFile(event) { 
  console.log(event);// called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedFile = event.target.files[0];

      
  


     reader.readAsDataURL(event.target.files[0]); // read file as data url
       
      reader.onload = (event) => { 
        let target: any = event.target; //<-- This (any) will tell compiler to shut up!
        this.url= target.result;
         console.log(event)// called once readAsDataURL is completed
        
      }
    }
}

   onFileChanged(event) {
     console.log(event);
     this.selectedFile = event.target.files[0]
   }
  ngOnInit() {
    console.log("init");
    this.globalService.getModel("/api/agency")
    .then((result) => {
      console.log(result);
      this.agency=result['data'];
      console.log(this.agency);
      
      this.url=this.agency.logos[1].url;
    }, (err) => {
      console.log(err);
      //this.loader.dismiss();
    });
 
  }
cancelAgency(){
  console.log("cancel");
  this.ngOnInit();
  this.disabled=true;
  this.btnEdit="Editar";
}
  editAgency(){
    console.log(this.agency);
    if(this.btnEdit=="Editar"){
      
      this.disabled=false;
      this.btnEdit="Guardar"
      console.log(this.disabled)
    }else
    if(this.btnEdit=="Guardar"){
      console.log(this.agency);

      
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      uploadData.append('agency',JSON.stringify(this.agency))
      
      this.globalService.updateModel(this.agency.id,uploadData,"/api/agency")
    .then((result) => {
      console.log(result);
      // this.agency=result['data'];
       console.log(this.agency);   
      this.disabled=true;
      this.btnEdit="Editar";
    }, (err) => {
      console.log(err);
      //this.loader.dismiss();
    });
     
    }
    
  }

  


}
