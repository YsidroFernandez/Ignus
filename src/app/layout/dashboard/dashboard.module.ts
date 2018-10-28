import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
} from './components';
import { StatModule } from '../../shared';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { PageHeaderModule } from '../../shared';
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts'; // <- HERE
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        PageHeaderModule,
        ChartModule,
        ChartsModule,
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        IndicadoresComponent,
        
    ]
})
export class DashboardModule {}
