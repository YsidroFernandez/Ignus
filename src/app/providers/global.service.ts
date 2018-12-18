import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


const httpOptionsDefault = {
  headers: new HttpHeaders({
    
    // 'accessToken':localStorage.getItem('accessToken'),
    
    //'Authorization': 'Basic '+btoa('jchiquin:12345'), 
     'Content-Type': 'application/json',
     

  })
};

    
@Injectable({
  providedIn: 'root'
})





export class GlobalService {

  apiBaseUrl:String='';
  ModelId;
  Model:any={};
  tipo:String;

  constructor(public http: HttpClient, private toastr: ToastrService) {
    this.apiBaseUrl = 'http://ignus-backend-jchiquin.c9users.io';
   // this.apiBaseUrl = 'http://ignus-backend-development-jchiquin.c9users.io';
  }

  getHeaderClear(){
     const httpOptions = {
      headers: new HttpHeaders({
        
         
      })
    };

    return httpOptions;
  }


  getModel(tipo: String,httpOptions=httpOptionsDefault){
    return new Promise(resolve =>{
      this.http.get(this.apiBaseUrl + "" + tipo,httpOptions).subscribe(data =>{
        resolve(data);
        console.log(data);
        

      }, err =>{
        console.log(err);
      })
    })
  }


  getModel_Id(id: String, tipo: String,httpOptions=httpOptionsDefault){
    return new Promise(resolve =>{
      this.http.get(this.apiBaseUrl + "" + tipo + '/' + id,httpOptions).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log({id: id,tipo: tipo, httpOptions: httpOptions});
      })
    })
  }

  addModel(model,tipo: String,httpOptions=httpOptionsDefault){
    return new Promise(resolve =>{
      this.http.post(this.apiBaseUrl + "" + tipo,model,httpOptions).subscribe((data : any) =>{
        console.log(data);  
        this.toastr.success('',data.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
        resolve(data);
      }, (err: any) =>{
        console.log(err);
        this.toastr.error('',err.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
        
      })
    })
  }

  updateModel(id, model, tipo: String,httpOptions=httpOptionsDefault){
    return new Promise(resolve =>{
      this.http.put(this.apiBaseUrl + "" + tipo  + '/' + id, model,httpOptions).subscribe((data: any) =>{
        console.log(data);
        this.toastr.success('',data.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
        resolve(data);
      }, (err: any) =>{
        console.log(err);
        this.toastr.error('',err.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
      })
    })
  }

  removeModel(id,tipo: String,httpOptions=httpOptionsDefault){
    return new Promise(resolve =>{
      this.http.delete(this.apiBaseUrl + "" + tipo + '/' + id,httpOptions).subscribe((data: any) =>{
        console.log(data);
        this.toastr.success('',data.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
        resolve(data);
      }, (err: any) =>{
        console.log(err);
        this.toastr.error('',err.message.text, {
          timeOut: 5000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
      })
    })
  }
}
