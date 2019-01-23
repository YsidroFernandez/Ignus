import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { transaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones.component';
import { PageHeaderModule } from '../../../shared';
import { ChartModule } from 'angular-highcharts';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

@NgModule({
    imports: [
        BsDatepickerModule.forRoot(), // ToastrModule added        
        DatepickerModule.forRoot(),
        ChartModule, CommonModule,FormsModule, ReactiveFormsModule, transaccionesRoutingModule, PageHeaderModule],
    declarations: [TransaccionesComponent]
})
export class transaccionesModule {}