import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {NgbModule,} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import exporting from 'highcharts/modules/exporting.src.js';
import { ToastrModule } from 'ngx-toastr';
//traslate general   actualmente utilizado en calendar
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es"
import { ModalModule, TimepickerModule, DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
registerLocaleData(localeEs);




export function highchartsModules() {
    return [ exporting ];
}
import { ChartsModule } from 'ng2-charts';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {

    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        ChartModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,  
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        ChartsModule,
        NgSelectModule,
        NgxSpinnerModule,
        
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
    bootstrap: [AppComponent]
})
export class AppModule { }
