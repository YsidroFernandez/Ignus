import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PostServicioRoutingModule } from './post-servicio-routing.module';
import { PostServicioComponent } from './post-servicio.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
@NgModule({
    imports: [ChartModule, CommonModule, PostServicioRoutingModule, PageHeaderModule],
    declarations: [PostServicioComponent]
})
export class PostServicioModule {}