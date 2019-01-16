import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    
    
    single: any[];
    multi: any[];
    lineChartMulti: any[];
    view: any[] = [700, 400];
  
    // options graps dashboard
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
  
    colorScheme = {
        domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
    };
  

    constructor() {
        Object.assign(this, { single })
    }

    ngOnInit() {}

}
