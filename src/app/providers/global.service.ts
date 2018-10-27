import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  apiBaseUrl:String='';
  ModelId;
  Model:any={};
  tipo:String;

  constructor(public http: HttpClient) {
    this.apiBaseUrl = 'http://localhost:3000/api/';
  }

  getModel(tipo: String){
    return new Promise(resolve =>{
      this.http.get(this.apiBaseUrl + "" + tipo).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      })
    })
  }


  getModel_Id(id: String, tipo: String){
    return new Promise(resolve =>{
      this.http.get(this.apiBaseUrl + "" + tipo + '/' + id).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log({id: id,tipo: tipo});
      })
    })
  }

  addModel(model,tipo: String){
    return new Promise(resolve =>{
      this.http.post(this.apiBaseUrl + "" + tipo,model).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      })
    })
  }

  updateModel(id, model, tipo: String){
    return new Promise(resolve =>{
      this.http.put(this.apiBaseUrl + "" + tipo  + '/' + id, model).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      })
    })
  }

  removeModel(id,tipo: String){
    return new Promise(resolve =>{
      this.http.delete(this.apiBaseUrl + "" + tipo + '/' + id).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      })
    })
  }
}
