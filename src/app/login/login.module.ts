import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [CommonModule, LoginRoutingModule,FormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {

    
}
//https://mattlewis92.github.io/angular-calendar/#/kitchen-sink
//https://github.com/mattlewis92/angular-calendar/tree/master/projects/angular-calendar
//https://mattlewis92.github.io/angular-calendar/docs/components/CalendarMonthViewComponent.html#source