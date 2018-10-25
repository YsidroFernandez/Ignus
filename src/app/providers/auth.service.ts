import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export class usuario {
  cedula: string;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  password?: string;
}

export class User {
  id: string;
  created: string;
  ttl: number;
  userId: number;
}

export class IdentityConfirmation {
  uid: string;
  token: string;
}

export class NewPasswordContext {
  accessToken: string;
  newPassword: string;
}

// urls
const BASE = "http://localhost:3000/api/Accounts";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CONFIRM = "/confirm";
const RESET = "/reset";
const SET_PASSWORD = "/reset-password";

// http params
const TOKEN = 'token';
const UID = 'uid';
const ACCESS_TOKEN = 'access_token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  access: boolean;
  token: string;
  private isLoggedIn = false;

  constructor(private http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
   }


   static get Constants():any {
    return {
      apiUrl:'http://172.19.24.135:3000/api/'
     }
  
  }

  public requestPasswordReset(account: Account) {
    return this
      .http
      .post(AuthService.Constants.apiUrl + 'usuarios/reset', account, { observe: 'response' });
  }


   postData(credentials, type){

    return new Promise((resolve, reject) =>{

      this.http.post(AuthService.Constants.apiUrl + type, credentials)
      .subscribe(res =>{
        resolve(res);
      }, (err) =>{
        //reject(err);
        reject(credentials);
      });

    });

  }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('usuario');
        this.isLoggedIn = false;
    }

    // Returns whether the user is currently authenticated
    // Could check if current token is still valid
    authenticated() : boolean {
      return this.isLoggedIn;
    }

  
}
