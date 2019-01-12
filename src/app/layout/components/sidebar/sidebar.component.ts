import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import { Menu } from './menu/menuJSON';
import { GlobalService } from "../../../providers/global.service";

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
    menu:any;
    directionIcon: string='fa fa-chevron-down'  
    @Output() collapsedEvent = new EventEmitter<boolean>();
    public user: any = {};
    public person: any = {};

    constructor(private translate: TranslateService, public router: Router,public globalService: GlobalService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.user = JSON.parse(localStorage.user);
        this.person = JSON.parse(localStorage.person || "{}");
        console.log( this.user);
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        // this.menu= [
        //     {
        //       "name": "Dashboard",
        //       "link": "/dashboard",
        //       "icon": "fa fa-fw fa-dashboard",
        //       "sub": null
        //     },
        //     {
        //       "name": "Dashboard (Cliente)",
        //       "link": "/dashboardcustomer",
        //       "icon": "fa fa-fw fa-dashboard",
        //       "sub": null
        //     },
        //     {
        //       "name": "Transacciones",
        //       "link": null,
        //       "icon": "fa fa-address-book",
        //       "sub": [
        //         {
        //           "name": "Solicitud",
        //           "link": null,
        //           "icon": "fa fa-address-book",
        //           "sub": [
        //             {
        //               "name": "Registro",
        //               "link": "/registrosolicitud",
        //               "icon": "fa fa-user",
        //               "sub": null
        //             },
        //             {
        //               "name": "Atención",
        //               "link": "/solicitud",
        //               "icon": "fa fa-building",
        //               "sub": null
        //             },
        //             {
        //               "name": "Citas",
        //               "link": "/citas",
        //               "icon": "fa fa-calendar",
        //               "sub": null
        //             },
        //             {
        //               "name": "Visitas",
        //               "link": "/visita",
        //               "icon": "fa fa-calendar",
        //               "sub": null
        //             }
        //           ]
        //         },
        //         {
        //           "name": "Actividades y reacudos",
        //           "link": "/activitiesCollections",
        //           "icon": "fa fa-address-book",
        //           "sub": null
        //         },
        //         {
        //           "name": "Reserva",
        //           "link": "/reserva",
        //           "icon": "fa fa-list-alt",
        //           "sub": null
        //         },
        //         {
        //           "name": "Registro",
        //           "link": "/inmueble",
        //           "icon": "fa fa-user",
        //           "sub": null
        //         },
        //         {
        //           "name": "Contrato",
        //           "link": "/contrato",
        //           "icon": "fa fa-fw fa-edit",
        //           "sub": null
        //         },
        //         {
        //           "name": "Calificación del servicio",
        //           "link": "/valoracion",
        //           "icon": "fa fa-star",
        //           "sub": null
        //         }
        //       ]
        //     },
        //     {
        //       "name": "Incidencias",
        //       "link": "/incidencias",
        //       "icon": "fa fa-fw fa-edit",
        //       "sub": null
        //     },
        //     {
        //       "name": "Post-Servicio",
             
        //       "icon": "fa fa-address-book",
        //       "sub": [
        //         {
        //           "name": "Promociones",
        //           "link": "/asignarpromociones",
        //           "icon": "fa fa-user",
        //           "sub": null
        //         },
        //         {
        //           "name": "Sugerencias",
        //           "link": "/sugerencias",
        //           "icon": "fa fa-user-circle-o",
        //           "sub": []
        //         },
        //         {
        //           "name": "Reclamos",
        //           "link": "/reclamos",
        //           "icon": "fa fa-calendar",
        //           "sub": null
        //         }
        //       ]
        //     },
        //     {
        //       "name": "Configuración del negocio",
        //       "link": null,
        //       "icon": "fa fa-cog",
        //       "sub": [
        //         {
        //           "name": "Inmobiliaria",
        //           "link": "/agency",
        //           "icon": "fa fa-building",
        //           "sub": null
        //         },
        //         {
        //           "name": "Inmuebles",
        //           "link": "/inmueble",
        //           "icon": "fa fa-building",
        //           "sub": null
        //         },
        //         {
        //           "name": "Usuarios",
        //           "link": "/cliente",
        //           "icon": "fa fa-user",
        //           "sub": null
        //         },
        //         {
        //           "name": "Clientes",
        //           "link": "/cliente",
        //           "icon": "fa fa-user",
        //           "sub": null
        //         },
        //         {
        //           "name": "Empleados",
        //           "link": "/empleados",
        //           "icon": "fa fa-calendar",
        //           "sub": null
        //         },
        //         {
        //           "name": "Promociones",
        //           "link": "/promociones",
        //           "icon": "fa fa-bullhorn",
        //           "sub": null
        //         },
        //         {
        //           "name": "Recaudos",
        //           "link": "/recaudo",
        //           "icon": "fa fa-calendar-plus-o",
        //           "sub": null
        //         },
        //         {
        //           "name": "Actividades",
        //           "link": "/actividades",
        //           "icon": "fa fa-check",
        //           "sub": null
        //         },
        //         {
        //           "name": "Redes Sociales",
        //           "link": "/socialnetworks",
        //           "icon": "fa fa-comments",
        //           "sub": null
        //         }
        //       ]
        //     },
        //     {
        //       "name": "Configuración del sistema",
        //       "link": null,
        //       "icon": "fa fa-cogs",
        //       "sub": [
        //         {
        //           "name": "Servicios",
        //           "link": "/services",
        //           "icon": "fa fa-home",
        //           "sub": null
        //         },
        //         {
        //           "name": "Roles",
        //           "link": "/role",
        //           "icon": "fa fa-user-circle-o",
        //           "sub": null
        //         },
        //         {
        //           "name": "Configuración Web",
        //           "link": "/reclamos",
        //           "icon": "fa fa-file",
        //           "sub": null
        //         },
        //         {
        //           "name": "Configuración Movil",
        //           "link": "/reclamos",
        //           "icon": "fa fa-mobile",
        //           "sub": null
        //         }
        //       ]
        //     },
        //     {
        //       "name": "Reportes",
        //       "link": null,
        //       "icon": "fa fa-bar-chart",
        //       "sub": [
        //         {
        //           "name": "Estadisticos",
        //           "link": null,
        //           "icon": "fa fa-bar-chart",
        //           "sub": [
        //             {
        //               "name": "Mas Solicitado",
        //               "link": "/promedio",
        //               "icon": "fa fa-user",
        //               "sub": null
        //             },
        //             {
        //               "name": "Reclamos",
        //               "link": "/reclamo",
        //               "icon": "fa fa-building",
        //               "sub": null
        //             },
        //             {
        //               "name": "Calificación",
        //               "link": "/calificacion",
        //               "icon": "fa fa-calendar",
        //               "sub": null
        //             },
        //             {
        //               "name": "Solicitudes",
        //               "link": "/solicitudes",
        //               "icon": "fa fa-calendar",
        //               "sub": null
        //             },
        //             {
        //               "name": "Cita",
        //               "link": "/cita",
        //               "icon": "fa fa-calendar",
        //               "sub": null
        //             }
        //           ]
        //         },
        //         {
        //           "name": "Estructurados",
        //           "link": null,
        //           "icon": "fa fa-address-book",
        //           "sub": [
        //             {
        //               "name": "Post-servicio",
        //               "link": "/post-servico",
        //               "icon": "fa fa-list-alt",
        //               "sub": null
        //             }
        //           ]
        //         },
        //         {
        //           "name": "No Estructurados",
        //           "link": "/reserva",
        //           "icon": "fa fa-list-alt",
        //           "sub": null
        //         }
        //       ]
        //     }
        //   ];
          
         
    }

    ngOnInit(): void {
      let user =localStorage.getItem('user');
      console.log(user);
      let obj = JSON.parse(user)
      console.log(obj.id);
      this.globalService.getModel_Id(obj.id.toString(),"/api/user/menu/intranet").then(
        result => {
        //   console.log(result);
          this.menu = result["data"];
        //   console.log(this.menu);
  
          
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
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
            this.showMenuReport = '10';
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
