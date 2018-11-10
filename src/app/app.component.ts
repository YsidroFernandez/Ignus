import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private spinnerService: Ng4LoadingSpinnerService)
        { }

    ngOnInit() {
        this.show();
    }

    show() {
        this.spinnerService.show();
        setTimeout(() => this.spinnerService.hide(), 4000)
    }
    
}
