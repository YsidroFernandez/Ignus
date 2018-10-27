import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from "../providers/auth.service";
import { GlobalService } from "./../providers/global.service";

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
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (this.usuario.username && this.usuario.password) {
      /*
      console.log(this.usuario.username + " " + this.usuario.password);
      this.authService.postData(this.usuario, "usuarios/login").then((result) => {
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData) {
          localStorage.setItem('usuario', JSON.stringify(this.resposeData))
          localStorage.setItem('isLoggedin', 'true');
          this.global.getModel_Id(this.resposeData.userId, "usuarios").then((result) => {
            console.log(result);
            localStorage.setItem('usuario', JSON.stringify(result));
            console.log('user:loged', result);
          })
          
        }
        else {
          this.presentToast("Por favor ingresa un usuario y contraseña válido");
        }
      }, (err) => {
        //Connection failed message
        this.presentToast("Por favor ingresa un usuario y contraseña válido%%");
      });*/
      localStorage.setItem('isLoggedin', 'true');
    }
    else {
      this.presentToast("Por favor ingresa usuario y contraseña para iniciar sesión");
    }

  }


  showError(text) {
    alert(text)
  }


  presentToast(msg) {
    alert(msg)
  }
}