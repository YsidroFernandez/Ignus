import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [],
  exports: [],
  entryComponents: []
})
export class ShareModule {
}
