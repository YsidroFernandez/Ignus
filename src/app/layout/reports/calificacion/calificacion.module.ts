import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CalificacionRoutingModule } from './calificacion-routing.module';
import { CalificacionComponent } from './calificacion.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
@NgModule({
    imports: [ChartModule, CommonModule, CalificacionRoutingModule, PageHeaderModule],
    declarations: [CalificacionComponent]
})
export class CalificacionModule {}