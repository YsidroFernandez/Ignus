import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import { Menu } from './menu/menuJSON';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    showMenuReport: string = '';
    showMenuSubAte: string = '';
    showMenuConf: string = '';
    pushRightClass: string = 'push-right';
    //menu: Menu[] = [];
    @Output() collapsedEvent = new EventEmitter<boolean>();
    

    constructor(private translate: TranslateService, public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

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

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
            console.log()
        } else {
            this.showMenu = element;
        }
    }

      addExpandClassConf(element: any) {
        if (element === this.showMenuConf) {
            this.showMenuConf = '0';
            console.log()
        } else {
            this.showMenuConf = element;
        }
    }
 
    addExpandClassReport(element: any) {
        if (element === this.showMenuReport) {
            this.showMenuReport = '0';
            console.log('pagina actual')
        } else {
            this.showMenuReport = element;
            console.log(element);
        }
    }

      addExpandClassSubAte(element: any) {
        if (element === this.showMenuSubAte) {
            this.showMenuSubAte = '0';
            console.log('pagina actual')
        } else {
            this.showMenuSubAte = element;
            console.log(element);
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
