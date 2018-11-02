import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromedioRoutingModule } from './promedio-routing.module';
import { PromedioComponent } from './promedio.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [ChartModule, CommonModule,FormsModule, ReactiveFormsModule, PromedioRoutingModule, PageHeaderModule],
    declarations: [PromedioComponent]
})
export class PromedioModule {}