import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReclamoRoutingModule } from './reclamo-routing.module';
import { ReclamoComponent } from './reclamo.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [ChartModule, CommonModule,FormsModule, ReactiveFormsModule, ReclamoRoutingModule, PageHeaderModule],
    declarations: [ReclamoComponent]
})
export class ReclamoModule {}