import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { enviroment } from '../../enviroments/enviroment';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class GlobalsProvider {
    // public serviceBaseUrl =  enviroment.apiHost;
    constructor() {
    }
//    public loading() {
//         let loading = this.loadingCtrl.create({
//             spinner: 'hide',
//             content: `<div class="boxLoading"></div>`
//         });
//         return loading;
//     }
}
