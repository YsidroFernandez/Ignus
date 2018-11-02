import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesComponent } from './solicitudes.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [ChartModule, CommonModule,FormsModule, ReactiveFormsModule, SolicitudesRoutingModule, PageHeaderModule],
    declarations: [SolicitudesComponent]
})
export class SolicitudesModule {}