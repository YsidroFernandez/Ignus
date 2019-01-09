import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    notifications:any;
    checkNotification:any;
    constructor(private translate: TranslateService, public router: Router, public globalService: GlobalService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
     this.getNotifications();
    }



    getNotifications() { //obtener servicios 
      let user =localStorage.getItem('user');
      console.log(user);
      let obj = JSON.parse(user)
      console.log(obj.id);
      this.globalService.getModel_Id(obj.id.toString(),"/api/notification").then(
        result => {
          console.log(result);
          this.notifications = result["data"];
          console.log(this.notifications);

          
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }  
      );

      this.globalService.getModel_Id(obj.id.toString(),"/api/notification/check").then(
        result => {
          console.log(result);
          this.checkNotification = result["data"];
          console.log(this.checkNotification);

          
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );


    }
    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
