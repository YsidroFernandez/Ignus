import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from "../providers/auth.service";
import { GlobalService } from "../providers/global.service";
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  ngOnInit() { }

  ForgotButton: any;
  HomeButton: any;
  model: any = {};
  returnUrl: string;
  resposeData: any;
  use: any;
  usuario = { "username": '', "password": '' };


  constructor(public router: Router,
    public authService: AuthService,
    private global: GlobalService,
    public route: Router,
    private toastr: ToastrService
   
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login() {
    console.log("login");
    //Header del httpRequest 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+btoa(this.usuario.username+':'+this.usuario.password),
      })
    };
    if (this.usuario.username && this.usuario.password) {
     this.global.getModel('/login',httpOptions) //De esta manera se harán las peticiones al servidor (Carpeta provider,archivo global.service.ts)
      .then(response =>{
        console.log(response);
        if(response['status']){ // evalúa el estatus de la respuesta de la peticion (si es true =>accede sino 'credenciales incorrectas' )
          localStorage.setItem('accessToken', response['data'].accessToken);
          localStorage.setItem('usuario', JSON.stringify(response['data']));
          this.router.navigate(['/dashboard']);
          console.log('entré');
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('user',JSON.stringify(response['data'].user));
          localStorage.setItem('person',JSON.stringify(response['data'].person));
        }else{
           this.toastr.error('',"Usuario o Contraseña Incorrectos",{
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-bottom-right'
           });
           
        }
      },err=>{
        console.log(err);
        this.toastr.error('',err,{
          timeOut: 5000,
          progressBar: true,
          positionClass: 'toast-bottom-right'
         });

      })
    }
    else {
      this.toastr.error('',"Por favor ingresa usuario y contraseña para iniciar sesión",{
        timeOut: 5000,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    }
  }


  showError(text) {
    alert(text)
  }


  presentToast(msg) { 
    alert(msg)
  }



}
