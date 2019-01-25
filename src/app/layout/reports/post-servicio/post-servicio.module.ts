import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostServicioRoutingModule } from './post-servicio-routing.module';
import { PostServicioComponent } from './post-servicio.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSelectModule} from 'ngx-select-ex';

@NgModule({
    imports: [
        NgxPaginationModule,
        BsDatepickerModule.forRoot(), // ToastrModule added        
        DatepickerModule.forRoot(),
        ChartModule, CommonModule,FormsModule, ReactiveFormsModule, PostServicioRoutingModule, PageHeaderModule, NgxSelectModule],
    declarations: [PostServicioComponent]
})
export class PostServicioModule {}