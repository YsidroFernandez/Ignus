import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoestructuradoRoutingModule } from './noestructurado-routing.module';
import { NoestructuradoComponent } from './noestructurado.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    imports: [
        NgxPaginationModule,
        BsDatepickerModule.forRoot(), // ToastrModule added        
        DatepickerModule.forRoot(),
        ChartModule, CommonModule,FormsModule, ReactiveFormsModule, NoestructuradoRoutingModule, PageHeaderModule],
    declarations: [NoestructuradoComponent]
})
export class NoestructuradoModule {}