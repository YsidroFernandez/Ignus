import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule,registerLocaleData } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TimelineComponent, NotificationComponent, ChatComponent} from './components';
import { StatModule } from '../../shared';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { PageHeaderModule } from '../../shared';
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts'; // <- HERE
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }    from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
defineLocale('es', esLocale);
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { ModalModule } from 'ngx-bootstrap/modal';





@NgModule({
    imports: [
        ModalModule.forRoot(),     
        NgbModule.forRoot(),
        SortableModule.forRoot(),
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        PageHeaderModule,
        ChartModule,
        ChartsModule,
        FormsModule,
        FontAwesomeModule,
        NgxChartsModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        })
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        IndicadoresComponent,
        
    ],
    providers: [NgbActiveModal],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}
