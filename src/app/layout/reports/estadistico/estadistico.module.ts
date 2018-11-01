import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { EstadisticoRoutingModule } from './estadistico-routing.module';
import { EstadisticoComponent } from './estadistico.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
@NgModule({
    imports: [ChartModule, CommonModule, EstadisticoRoutingModule, PageHeaderModule],
    declarations: [EstadisticoComponent]
})
export class EstadisticoModule {}


