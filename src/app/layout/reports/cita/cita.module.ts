import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CitaRoutingModule } from './cita-routing.module';
import { CitaComponent } from './cita.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
@NgModule({
    imports: [ChartModule, CommonModule, CitaRoutingModule, PageHeaderModule],
    declarations: [CitaComponent]
})
export class CitaModule {}