import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgxSpinnerModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, TransactionsComponent]
})
export class LayoutModule {}
